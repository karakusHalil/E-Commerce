import { message, Table } from "antd";
import { useEffect, useState } from "react";

function UserList() {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span
          style={{
            color: "white",
            padding: "5px 10px",
            backgroundColor: role === "admin" ? "#ff4d4f" : "#91d5ff",
            borderRadius: "5px",
          }}
        >
          {role}
        </span>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Kullanıcıları getirirken hata oluştu !");
      }
    } catch (error) {
      console.log("Sunucu Hatası !", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default UserList;
