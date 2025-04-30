import { Button, Form, Input, message, Radio, Select } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

function UpdateUser() {
  const [form] = Form.useForm();
  const formLayout = "vertical";

  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;
  //   console.log(userId);

  const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            username: data.username,
            email: data.email,
            role: data.role,
          });
          console.log(form.getFieldsValue());
        }
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleUpdateUsers = async (values) => {
    if (!values.username || !values.email || !values.password) {
      message.warning(
        "Kullanıcı adı, e-posta ve şifre alanları boş bırakılamaz."
      );
      return;
    }

    // Email ve Username'in daha önce kullanılıp kullanılmadığını kontrol et
    const userCheckResponse = await fetch(
      `http://localhost:5000/api/users/check?email=${values.email}&username=${values.username}&userId=${userId}`
    );

    if (!userCheckResponse.ok) {
      const userCheckError = await userCheckResponse.json();
      message.error(
        userCheckError.error ||
          "Bu e-posta ya da kullanıcı adı zaten kullanılıyor."
      );
      return; // Hata varsa güncelleme işlemi yapılmaz
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        setTimeout(() => {
          navigate("/admin/users/list");
        }, 1000);
      } else {
        message.error("Kullanıcı güncelleme işlemi başarısız !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={handleUpdateUsers}
      >
        <Form.Item label="Name" name="username">
          <Input placeholder="User name enter..." />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="User email enter..." />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input placeholder="User password enter..." />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select
            style={{ width: 150 }} // genişliği burada ayarladık
            defaultValue="user"
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateUser;
