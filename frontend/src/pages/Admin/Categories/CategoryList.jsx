import { Table } from "antd";
import { useEffect, useState } from "react";

function CategoryList() {
  const [dataList, setDataList] = useState([]);

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

  useEffect(() => {
    getCategories();
    console.log(dataList);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "img",
      width: "40%",
    },
  ];
  //   const data = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sydney No. 1 Lake Park",
  //     },
  //     {
  //       key: "4",
  //       name: "Jim Red",
  //       age: 32,
  //       address: "London No. 2 Lake Park",
  //     },
  //   ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Table columns={columns} dataSource={dataList} onChange={onChange} />
    </>
  );
}

export default CategoryList;
