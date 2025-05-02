import { Button, Checkbox, Form, Input, InputNumber } from "antd";

function CreateProduct() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const colorOptions = [
    "Black",
    "White",
    "Gray",
    "Red",
    "Yellow",
    "Blue",
    "Pink",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
          colors: ["Black", "White"],
          sizes: ["S", "M", "L"],
        }}
        // onFinish={{}}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Lütfen ürün ismi giriniz !" }]}
        >
          <Input placeholder="Product name enter..." />
        </Form.Item>
        <Form.Item
          label="Stock Code"
          name="stockCode"
          rules={[{ required: true, message: "Stok kod ekleyiniz !" }]}
        >
          <Input placeholder="Product Stock Code enter..." />
        </Form.Item>
        <Form.Item
          label="Product Images"
          name="images"
          rules={[{ required: true, message: "Lütfen fotoğraf ekleyiniz !" }]}
        >
          <Input.TextArea placeholder="Product Images enter..." rows={4} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Lütfen açıklama giriniz !" }]}
        >
          <Input.TextArea placeholder="Product Description enter..." rows={5} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Lütfen fiyat giriniz !" }]}
        >
          <InputNumber
            placeholder="Enter..."
            min={0}
            step={0.01}
            max={100000}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <InputNumber
            placeholder="Enter..."
            min={0}
            step={0.01}
            max={100}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <InputNumber
            placeholder="Enter..."
            min={0}
            step={0.01}
            max={100}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber
            placeholder="Enter..."
            min={0}
            step={1}
            max={100000}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item
          label="Colors"
          name="colors"
          rules={[{ required: true, message: "Lütfen renk seçiniz !" }]}
        >
          <Checkbox.Group options={colorOptions} />
        </Form.Item>
        <Form.Item
          label="Sizes"
          name="sizes"
          rules={[{ required: true, message: "Lütfen beden seçiniz !" }]}
        >
          <Checkbox.Group options={sizeOptions} />
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
