import { Table, Tooltip, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const [categoryResponse, productResponse] = await Promise.all([
        fetch("http://localhost:5000/api/categories"),
        fetch("http://localhost:5000/api/products"),
      ]);
      if (!categoryResponse.ok || !productResponse) {
        console.log("Veri Getirme Başarısız !");
      } else {
        const [categoryList, productList] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);
        const dataSource = productList.map((product) => {
          const categoryId = product.category;
          const category = categoryList.find(
            (category) => category._id === categoryId
          );
          return { ...product, categoryName: category ? category.name : "" };
        });
        setProducts(dataSource);
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: productId }),
        }
      );
      if (response.ok) {
        message.success("Ürün Başarıyla Silindi.");
        await getProducts();
        navigate("/admin/products/list");
      } else {
        message.error("Ürün Silme İşlemi Başarısız !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      width: "20%",
      render: (img, record) => (
        <img
          alt={`/${record.images}`}
          src={`/${record.images[0]}`}
          style={{
            width: "100px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #eee",
            padding: "1px",
            backgroundColor: "#fff",
          }}
          onClick={() => navigate(`/admin/products/detail/${record._id}`)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Size",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {sizes.map((size, index) => (
            <div
              key={index}
              style={{
                width: "32px",
                height: "32px",
                lineHeight: "32px",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                border: "1px solid #dcdcdc",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {size}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Color",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {colors.map((color, index) => (
            <Tooltip key={index} title={color}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: color,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Process",
      key: "process",
      width: "15%",
      render: (record) => (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button
              color="cyan"
              variant="solid"
              onClick={() => navigate(`/admin/users/update/${record._id}`)}
              style={{ height: "32px", width: "120px" }}
            >
              Update
            </Button>
            <Button
              color="danger"
              variant="solid"
              onClick={() => deleteProduct(record._id)}
              style={{ height: "32px", width: "120px" }}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products} />
    </>
  );
}

export default ProductList;
