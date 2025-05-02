import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { useEffect, useState } from "react";

function CreateProduct() {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const [categories, setCategories] = useState([]);
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

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        message.error("Kategori getirirken bir hata meydana geldi !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  useEffect(() => {
    getCategories();
    console.log(categories);
  }, []);

  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
          colors: ["Black", "White"],
          sizes: ["S", "M", "L"],
          price: 0,
          discount: 0,
          stock: 0,
        }}
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
          />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <InputNumber placeholder="Enter..." min={0} step={0.01} max={100} />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber placeholder="Enter..." min={0} step={1} max={100000} />
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
        <Form.Item
          label="Categories"
          name="category"
          rules={[{ required: true, message: "Lütfen kategori seçiniz !" }]}
        >
          <Select placeholder="Select a category...">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
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
