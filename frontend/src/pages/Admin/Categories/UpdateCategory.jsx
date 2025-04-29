import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";

function UpdateCategory() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const params = useParams();
  const navigate = useNavigate();
  const categoryId = params.id;

  // console.log(categoryId);

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
          console.log(form.getFieldsValue);
        }
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };
  getCategoryById();

  const handleCreateCategory = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("Kategori başarıyla eklendi...");
        navigate("/admin/categories/list");
      } else {
        console.log("Kategori oluşturulurken hata meydana geldi !");
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
        onFinish={handleCreateCategory}
      >
        <Form.Item label="Category Name" name="name">
          <Input placeholder="Category name enter..." />
        </Form.Item>
        <Form.Item label="Category Image" name="img">
          <Input placeholder="Category Image enter..." />
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

export default UpdateCategory;
