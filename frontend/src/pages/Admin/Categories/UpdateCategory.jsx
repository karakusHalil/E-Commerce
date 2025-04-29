import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";

function UpdateCategory() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const params = useParams();
  const navigate = useNavigate();
  const categoryId = params.id;

  // console.log(categoryId);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Kategori Başarıyla Güncellendi",
    });
  };

  const getCategoryById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
            id: categoryId,
          });
          console.log(form.getFieldsValue());
        }
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };
  useEffect(() => {
    getCategoryById();
  }, []);

  const handleUpdateCategory = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        console.log("Kategori başarılı");
        setTimeout(() => {
          navigate("/admin/categories/list");
        }, 1200);
      } else {
        message.error("Kategori güncelleme işlemi başarısız !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={handleUpdateCategory}
      >
        <Form.Item label="Category Name" name="name">
          <Input placeholder="Category name enter..." />
        </Form.Item>
        <Form.Item label="Category Image" name="img">
          <Input placeholder="Category Image enter..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={success}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateCategory;
