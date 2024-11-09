import { Layout, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const PageLayout = (props: Props) => {
  const { children } = props;

  const navigateTo = useNavigate();

  const navigateToHome = () => {
    navigateTo("/");
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#15171c",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo">
          <Typography.Title
            onClick={() => navigateToHome()}
            level={3}
            style={{ margin: 0, color: "#FFF", cursor: "pointer" }}
          >
            Pijja Khaa Lo
          </Typography.Title>
        </div>
      </Header>
      <Layout style={{ marginTop: 72, marginBottom: 72 }}>{children}</Layout>
    </Layout>
  );
};
