import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router";

function CreateUser() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const navigate = useNavigate();


  const handleCreateUser = async (values) => {
    // Boş alanları kontrol et
    if (!values.username || !values.email || !values.password) {
      message.warning(
        "Kullanıcı adı, e-posta ve şifre alanları boş bırakılamaz."
      );
      return;
    }

    // Email ve Username'in daha önce kullanılıp kullanılmadığını kontrol et
    const userCheckResponse = await fetch(
      `http://localhost:5000/api/users/check?email=${values.email}&username=${values.username}`
    );

    if (!userCheckResponse.ok) {
      const userCheckError = await userCheckResponse.json();
      message.error(
        userCheckError.error ||
          "Bu e-posta ya da kullanıcı adı zaten kullanılıyor."
      );
      return; // Hata varsa kullanıcı eklenemez
    }
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kullanıcı Ekleme Başarılı");
        navigate("/admin/users/list");
      } else {
        message.error("Kullanıcı Oluştururken Hata Meydana Geldi !");
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
        onFinish={handleCreateUser}
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
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateUser;
