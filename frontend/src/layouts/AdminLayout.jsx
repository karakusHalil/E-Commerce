import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
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
import PropTypes from "prop-types";
const { Header, Footer, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/categories/list")) return "Category List";
    if (path.includes("/categories/create")) return "Category Add";
    if (path.includes("/categories/update")) return "Category Update";
    if (path.includes("/products/list")) return "Product List";
    if (path.includes("/products/create")) return "Product Add";
    if (path.includes("/users/list")) return "User List";
    if (path.includes("/users/create")) return "User Add";
    if (path.includes("/coupons/list")) return "Coupon List";
    if (path.includes("/coupons/create")) return "Coupon Add";
    if (path === "/admin") return "Dashboard";
    return "";
  };

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
          path: "/admin/categories/create",
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
          path: "/admin/products/create",
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
      children: [
        {
          key: "4-1",
          icon: <OrderedListOutlined />,
          label: "User List",
          path: "/admin/users/list",
          onClick: () => {
            navigate("/admin/users/list");
          },
        },
        {
          key: "4-2",
          icon: <PlusOutlined />,
          label: "User Add",
          path: "/admin/users/create",
          onClick: () => {
            navigate("/admin/users/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <TagsOutlined />,
      label: "Coupon",
      path: "/admin/coupon",
      children: [
        {
          key: "5-1",
          icon: <OrderedListOutlined />,
          label: "Coupon List",
          path: "/admin/coupons/list",
          onClick: () => {
            navigate("/admin/coupons/list");
          },
        },
        {
          key: "5-2",
          icon: <PlusOutlined />,
          label: "Coupon Add",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
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
            <Header style={{ color: "white" }}>{getTitle()}</Header>
            <Content style={{ width: "95%", margin: "25px" }}>
              {children}
            </Content>
            <Footer style={{}}>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
}

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
