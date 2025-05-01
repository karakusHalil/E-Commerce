import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Button,
  Upload,
  message,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      message.error("Ürün detayları alınamadı.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("Detay getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}/image`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Yükleme hatası");
      message.success("Fotoğraf yüklendi.");
      fetchProduct();
    } catch (error) {
      message.error("Fotoğraf yüklenemedi.");
    }
    return false;
  };

  const handleImageDelete = async (imgToDelete) => {
    const updatedImages = product.images.filter((img) => img !== imgToDelete);

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, images: updatedImages }),
      });
      if (!res.ok) throw new Error("Silme hatası");
      message.success("Fotoğraf silindi.");
      fetchProduct();
    } catch (error) {
      message.error("Fotoğraf silinemedi.");
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/products/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Silme hatası");
      message.success("Ürün silindi.");
      navigate("/admin/products/list");
    } catch (error) {
      message.error("Ürün silinemedi.");
    }
  };

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <Card title={product.name} style={{ margin: 24 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Upload
          beforeUpload={handleImageUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
        </Upload>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.images?.map((img, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Image
                src={`/${img}`}
                alt={`Foto ${index + 1}`}
                width={150}
                height={200}
                style={{ objectFit: "cover" }}
              />
              <Popconfirm
                title="Bu fotoğraf silinsin mi?"
                onConfirm={() => handleImageDelete(img)}
                okText="Evet"
                cancelText="Hayır"
              >
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  style={{ position: "absolute", top: 5, right: 5 }}
                />
              </Popconfirm>
            </div>
          ))}
        </div>
        <Text strong>Fiyat:</Text> <Text>{product.price}₺</Text>
        <Text strong>Stok:</Text> <Text>{product.stock}</Text>
        <Text strong>İndirim:</Text> <Text>{product.discount * 100}%</Text>
        <Text strong>Açıklama:</Text> <Text>{product.description}</Text>
        <Text strong>Renkler:</Text> <Text>{product.colors?.join(", ")}</Text>
        <Text strong>Bedenler:</Text> <Text>{product.sizes?.join(", ")}</Text>
        <Text strong>Stok Kodu:</Text> <Text>{product.stockCode}</Text>
        <Text strong>Oluşturulma:</Text>{" "}
        <Text>{new Date(product.createdAt).toLocaleString()}</Text>
        <Text strong>Güncellenme:</Text>{" "}
        <Text>{new Date(product.updatedAt).toLocaleString()}</Text>
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={handleUpdate}>
            Güncelle
          </Button>
          <Popconfirm
            title="Bu ürünü silmek istediğinizden emin misiniz?"
            onConfirm={handleDelete}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </Card>
  );
};

export default ProductDetail;
