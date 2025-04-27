import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  OrderedListOutlined,
  MinusOutlined,
  PlusOutlined,
  UserOutlined,
  TagsOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;

function AdminLayout() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "DashBoard",
      path: "/admin",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Category",
      path: "/admin/category",
      children: [
        {
          key: "2-1",
          icon: <OrderedListOutlined />,
          label: "Category List",
          path: "/admin/categories/list",
          onClick: () => {
            navigate("/admin/categories/list");
          },
        },
        {
          key: "2-2",
          icon: <PlusOutlined />,
          label: "Category Add",
          path: "/admin/categories/creat",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "3",
      icon: <ShoppingOutlined />,
      label: "Product",
      path: "/admin/product",
      children: [
        {
          key: "3-1",
          icon: <OrderedListOutlined />,
          label: "Product List",
          path: "/admin/products/list",
          onClick: () => {
            navigate("/admin/products/list");
          },
        },
        {
          key: "3-2",
          icon: <PlusOutlined />,
          label: "Product Add",
          path: "/admin/products/creat",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "User",
      path: "/admin/user",
      onClick: () => {
        navigate("/admin/user");
      },
    },
    {
      key: "5",
      icon: <TagsOutlined />,
      label: "Coupon",
      path: "/admin/coupon",
      onClick: () => {
        navigate("/admin/coupon");
      },
    },
  ];
  return (
    <>
      <div className="admin-layout">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width="20%" style={{ color: "white" }}>
            <Menu mode="inline" theme="dark" items={items} />
          </Sider>
          <Layout>
            <Header style={{ color: "white" }}>Header</Header>
            <Content style={{ padding: "30px" }}>Content</Content>
            <Footer style={{}}>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
}

export default AdminLayout;
