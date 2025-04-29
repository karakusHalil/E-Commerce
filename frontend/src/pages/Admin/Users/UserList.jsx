import { message, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

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
            backgroundColor: role === "admin" ? "#FFCC00" : "#91d5ff",
            borderRadius: "5px",
          }}
        >
          {role}
        </span>
      ),
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
            onClick={() => navigate(`/admin/users/update/${record._id}`)}
            style={{ marginRight: "5px" }}
          >
            Update
          </Button>
          <Button color="danger" variant="solid" onClick={() => {}}>
            Delete
          </Button>
        </>
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
