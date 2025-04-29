import { Table, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      width: "25%",
      render: (img, record) => (
        <img alt={`/${record.img}`} src={`/${record.img}`} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "%50",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Process",
      key: "process",
      width: "25%",
      render: (record) => (
        <>
          <Button
            color="cyan"
            variant="solid"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
            style={{ marginRight: "5px" }}
          >
            Update
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => deleteCategories(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (response.ok) {
        const data = await response.json();
        setDataList(data);
      } else {
        console.log("Kategori getirirken sorun oluştu !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  const deleteCategories = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: categoryId }),
        }
      );
      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        await getCategories();
        navigate("/admin/categories/list");
      } else {
        message.error("Kategori silme işlemi başarısız !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataList.map((item) => ({ ...item, key: item._id }))}
        onChange={onChange}
      />
    </>
  );
}

export default CategoryList;
