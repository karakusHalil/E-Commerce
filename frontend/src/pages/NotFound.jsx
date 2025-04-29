import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.message}>Oops! Sayfa bulunamadı.</h2>
      <Button type="primary" onClick={() => navigate("/")}>
        Ana Sayfaya Dön
      </Button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    textAlign: "center",
    padding: "20px",
  },
  code: {
    fontSize: "96px",
    margin: 0,
    color: "#1890ff",
  },
  message: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#555",
  },
};

export default NotFound;
