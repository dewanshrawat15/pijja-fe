import {
  Row,
  Col,
  Typography,
  Input,
  Spin,
  Collapse,
  CollapseProps,
} from "antd";
import { PageLayout } from "../../components/PageLayout";
import { deleteUser, useGetAllPlayersDetails } from "../../common/api";
import { LoadingOutlined } from "@ant-design/icons";

export const DashboardPage = () => {
  const { data, isLoading, isError } = useGetAllPlayersDetails();

  let content = <></>;
  if (isError) {
    content = <div></div>;
  } else if (isLoading) {
    content = (
      <Row>
        <Col span={8} offset={8}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Col>
      </Row>
    );
  } else if (data) {
    const currItems = data.map((user) => {
      return {
        key: user.user_id,
        label: user.user_name,
        children: (
          <Row>
            <Col span={3}>
              <div className="bttn">
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Edit</center>
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={3} offset={1}>
              <div
                className="bttn"
                onClick={() => {
                  deleteUser(user.user_id);
                }}
              >
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Delete</center>
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={3} offset={1}>
              <div className="bttn">
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Buy Pizza</center>
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={3} offset={1}>
              <div className="bttn">
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Log Pizza</center>
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={3} offset={1}>
              <div className="bttn">
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Pizza History</center>
                </Typography.Paragraph>
              </div>
            </Col>
          </Row>
        ),
      };
    });
    content = <Collapse items={currItems} />;
  }

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
          {content}
        </Col>
      </Row>
    </PageLayout>
  );
};
