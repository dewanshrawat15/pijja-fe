import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/PageLayout";

const { Header } = Layout;

export const HomeScreen: React.FC = () => {
  const navigateTo = useNavigate();

  const navigateToHome = () => {
    navigateTo("/");
  };

  return (
    <PageLayout>
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
            <Typography.Title level={1} style={{ margin: 0, color: "#15171c" }}>
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
          <div
            className="bttn"
            onClick={() => {
              navigateTo("/user");
            }}
          >
            <center>
              <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                New User
              </Typography.Paragraph>
            </center>
          </div>
        </Col>
        <Col span={3} offset={1}>
          <div
            className="bttn"
            onClick={() => {
              navigateTo("/leaderboard");
            }}
          >
            <center>
              <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                Leaderboard
              </Typography.Paragraph>
            </center>
          </div>
        </Col>
        <Col span={3} offset={1}>
          <div
            className="bttn"
            onClick={() => {
              navigateTo("/dashboard");
            }}
          >
            <center>
              <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                Manage Players
              </Typography.Paragraph>
            </center>
          </div>
        </Col>
      </Row>
    </PageLayout>
  );
};
