import React from "react";
import { Col, Layout, Menu, Row, theme, Typography } from "antd";
import "./index.css";

const { Header } = Layout;

export const LeaderboardPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <Typography.Title level={3} style={{ margin: 0, color: "#FFF" }}>
            Pijja Khaa Lo
          </Typography.Title>
        </div>
      </Header>
      <Layout style={{ marginTop: 128, marginBottom: 128 }}>
        <Row>
          <Col span={24}>
            <center>
              <img
                style={{ borderRadius: 200 }}
                src="./pijja.jpg"
                alt="Logo Icon"
                height={400}
                width={400}
              />
            </center>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col span={24}>
            <center>
              <Typography.Title
                level={1}
                style={{ margin: 0, color: "#15171c" }}
              >
                Pijja?
              </Typography.Title>
            </center>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>
          <Col span={3} offset={7}>
            <div className="bttn">
              <center>
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  New User
                </Typography.Paragraph>
              </center>
            </div>
          </Col>
          <Col span={3} offset={1}>
            <div className="bttn">
              <center>
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  Leaderboard
                </Typography.Paragraph>
              </center>
            </div>
          </Col>
          <Col span={3} offset={1}>
            <div className="bttn">
              <center>
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  Manage Players
                </Typography.Paragraph>
              </center>
            </div>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

// export const LeaderboardPage = () => {
//   return <div>Leaderboard</div>;
// };
