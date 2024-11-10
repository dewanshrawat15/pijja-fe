import {
  Row,
  Col,
  Typography,
  Input,
  Spin,
  Collapse,
  CollapseProps,
  Modal,
  notification,
} from "antd";
import { PageLayout } from "../../components/PageLayout";
import {
  buyPizza,
  deleteUser,
  getAvailablePizzasToBuy,
  useGetAllPlayersDetails,
} from "../../common/api";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Pizza } from "../../common/models";
import React from "react";
import { getRsFromPaise } from "../../common/utils";

export const DashboardPage = () => {
  const { data, isLoading, isError } = useGetAllPlayersDetails();
  const [open, setOpen] = useState(false);
  const [pizzasAvailableToBuy, setPizzasAvailableToBuy] = useState<Pizza[]>([]);
  const [currUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: "Default" });

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
              Manage Players
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
              <div
                className="bttn"
                onClick={async () => {
                  try {
                    setCurrentUser(user.user_id);
                    const response = await getAvailablePizzasToBuy();
                    setPizzasAvailableToBuy(response.pizzas);
                    setOpen(true);
                  } catch (error) {
                    console.error(error);
                    // add telemetry here to track
                  }
                }}
              >
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
    return (
      <>
        {contextHolder}
        <PageLayout>
          <Row>
            <Col span={16} offset={1}>
              <Collapse items={currItems} />
              <Modal
                title="Pizzas available to buy"
                open={open}
                onOk={() => {
                  // handle ok
                  setCurrentUser(undefined);
                  setOpen(false);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              >
                <br />
                {pizzasAvailableToBuy.map((pizza, index) => {
                  return (
                    <>
                      <Row
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <Col span={12}>
                          {pizza.name} - {getRsFromPaise(pizza.price)}
                        </Col>
                        <Col span={6} offset={6}>
                          <div
                            className="sm-bttn"
                            onClick={async () => {
                              if (currUser) {
                                try {
                                  await buyPizza({
                                    user_id: currUser,
                                    pijja_id: pizza.pijja_id,
                                  });
                                  setOpen(false);
                                  api.info({
                                    message: `Pizza purchased successfully`,
                                    placement: "topRight",
                                  });
                                } catch (error) {
                                  api.error({
                                    message: `Error while purchasing pizza`,
                                    placement: "topRight",
                                  });
                                }
                              } else {
                                api.error({
                                  message: `User not set`,
                                  placement: "topRight",
                                });
                              }
                            }}
                          >
                            <Typography.Paragraph
                              style={{ margin: 0, color: "#FFF" }}
                            >
                              <center>Buy Pizza</center>
                            </Typography.Paragraph>
                          </div>
                        </Col>
                      </Row>
                      <br />
                    </>
                  );
                })}
              </Modal>
            </Col>
          </Row>
        </PageLayout>
      </>
    );
  } else {
    return <></>;
  }
};
