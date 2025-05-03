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
  Spin,
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
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      message.error("Ürün detayları alınamadı.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      fetchProduct(); // Yeniden ürün bilgilerini çek
    } catch (error) {
      message.error("Fotoğraf yüklenemedi.", error);
    }
    return false; // Upload işlemi tamamlanınca, varsayılan davranışı engellemek için
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
      fetchProduct(); // Fotoğraf silindikten sonra güncel ürünü tekrar al
    } catch (error) {
      message.error("Fotoğraf silinemedi.", error);
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
      message.error("Ürün silinemedi.", error);
    }
  };

  if (loading || !product)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "250px",
        }}
      >
        <Spin tip="Yükleniyor..." size="large" />
      </div>
    );

  return (
    <Card
      title={product.name}
      style={{
        margin: 24,
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Fotoğraf Yükle */}
        <Upload
          beforeUpload={handleImageUpload}
          showUploadList={false}
          accept="image/*"
          style={{ marginBottom: "20px" }}
        >
          <Button
            icon={<UploadOutlined />}
            style={{ width: "200px", marginBottom: "16px" }}
          >
            Fotoğraf Yükle
          </Button>
        </Upload>

        {/* Fotoğraf Listesi */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {product.images?.length > 0 ? (
            product.images?.map((img, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={`/${img}`}
                  alt={`Foto ${index + 1}`}
                  width={150}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
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
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(255, 0, 0, 0.7)",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "#fff",
                    }}
                  />
                </Popconfirm>
              </div>
            ))
          ) : (
            <div
              style={{
                position: "relative",
                width: "150px",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Image
                src="/img/no-image/image.png"
                alt="Fotoğraf Yok"
                width={150}
                height={200}
                style={{
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        {/* Ürün Bilgileri */}
        <div style={{ marginTop: "20px" }}>
          <Text strong>Fiyat:</Text> <Text>{product.price}₺</Text>
        </div>
        <div>
          <Text strong>Stok:</Text> <Text>{product.stock}</Text>
        </div>
        <div>
          <Text strong>İndirim:</Text> <Text>{product.discount * 100}%</Text>
        </div>
        <div>
          <Text strong>Açıklama:</Text> <Text>{product.description}</Text>
        </div>
        <div>
          <Text strong>Renkler:</Text> <Text>{product.colors?.join(", ")}</Text>
        </div>
        <div>
          <Text strong>Bedenler:</Text> <Text>{product.sizes?.join(", ")}</Text>
        </div>
        <div>
          <Text strong>Stok Kodu:</Text> <Text>{product.stockCode}</Text>
        </div>
        <div>
          <Text strong>Oluşturulma:</Text>{" "}
          <Text>{new Date(product.createdAt).toLocaleString()}</Text>
        </div>
        <div>
          <Text strong>Güncellenme:</Text>{" "}
          <Text>{new Date(product.updatedAt).toLocaleString()}</Text>
        </div>

        {/* Güncelleme ve Silme Butonları */}
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleUpdate}
            style={{
              width: "120px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Güncelle
          </Button>

          <Popconfirm
            title="Bu ürünü silmek istediğinizden emin misiniz?"
            onConfirm={handleDelete}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              style={{
                width: "120px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </Card>
  );
};

export default ProductDetail;
