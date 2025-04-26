import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

function AdminLayout() {
  return (
    <>
      <div className="admin-layout">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width="25%" style={{ color: "white" }}>
            Sider
          </Sider>
          <Layout>
            <Header style={{ color: "white" }}>Header</Header>
            <Content style={{}}>Content</Content>
            <Footer style={{}}>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
}

export default AdminLayout;
