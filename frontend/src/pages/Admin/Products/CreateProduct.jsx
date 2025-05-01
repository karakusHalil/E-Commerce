import { Button, Form, Input } from "antd";

function CreateProduct() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={{}}
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

export default CreateProduct;
