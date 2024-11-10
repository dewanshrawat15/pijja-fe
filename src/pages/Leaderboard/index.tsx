import React from "react";
import "./index.css";
import { PageLayout } from "../../components/PageLayout";
import { Row, Col, Typography, Spin, notification } from "antd";
import { useLeaderboardData } from "../../common/api";
import { LoadingOutlined } from "@ant-design/icons";
import { buildDateStringFromEpoch } from "../../common/utils";

export const LeaderboardPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { isLoading, isError, data } = useLeaderboardData();

  if (isLoading) {
    return (
      <PageLayout>
        <Row>
          <Col span={8} offset={2}>
            <Typography.Title
              level={3}
              style={{ margin: 0, color: "#15171c", cursor: "pointer" }}
            >
              Manage Players
            </Typography.Title>
          </Col>
        </Row>
        <br />

        <Row>
          <Col span={15} offset={2}>
            <Row>
              <Col span={8} offset={8}>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    );
  } else if (isError) {
    return (
      <PageLayout>
        <Row>
          <Col span={8} offset={2}>
            <Typography.Title
              level={3}
              style={{ margin: 0, color: "#15171c", cursor: "pointer" }}
            >
              Leaderboard
            </Typography.Title>
          </Col>
        </Row>
        <br />

        <Row>
          <Col span={15} offset={2}>
            {/* handle error screen layout */}
          </Col>
        </Row>
      </PageLayout>
    );
  } else if (data) {
    return (
      <>
        {contextHolder}
        <PageLayout>
          <Row>
            <Col span={8} offset={2}>
              <Typography.Title
                level={3}
                style={{ margin: 0, color: "#15171c", cursor: "pointer" }}
              >
                Leaderboard
              </Typography.Title>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={2}>
              <Typography.Title level={5}>Name</Typography.Title>
            </Col>

            <Col span={2} offset={1}>
              <Typography.Title level={5}>Rank</Typography.Title>
            </Col>

            <Col span={3} offset={1}>
              <Typography.Title level={5}>History</Typography.Title>
            </Col>
          </Row>
          {Object.entries(data).map((item, index) => {
            const userResponse = item[1];
            return (
              <>
                <Row>
                  <Col span={5} offset={2}>
                    {userResponse.name}
                  </Col>

                  <Col span={2} offset={1}>
                    {userResponse.rank}
                  </Col>
                  <Col span={8} offset={1}>
                    {userResponse.pizzas.map((pijja) => {
                      return (
                        <Row>
                          <Col span={16}>
                            {pijja.name} -{" "}
                            {buildDateStringFromEpoch(pijja.timestamp)}
                          </Col>
                        </Row>
                      );
                    })}
                  </Col>
                </Row>
                <br />
              </>
            );
          })}
        </PageLayout>
      </>
    );
  } else {
    return <></>;
  }
};

// export const LeaderboardPage = () => {
//   return <div>Leaderboard</div>;
// };
