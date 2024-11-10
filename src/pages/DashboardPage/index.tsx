import { Row, Col, Typography, Spin, Collapse, notification } from "antd";
import { PageLayout } from "../../components/PageLayout";
import {
  deleteUser,
  getAvailablePizzasToBuy,
  getHistory,
  getPizzasAvailableToLog,
  useGetAllPlayersDetails,
} from "../../common/api";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PijjaDetailed, Pizza } from "../../common/models";
import React from "react";
import { BuyPizzaModal } from "./modals/BuyPizzaModal";
import { LogPizzaModal } from "./modals/LogPizzaModal";
import { PizzaHistoryModal } from "./modals/PizzaHistoryModal";
import { getRsFromPaise } from "../../common/utils";

export const DashboardPage = () => {
  const [currUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();

  // data fetching hook
  const { data, isLoading, isError } = useGetAllPlayersDetails();
  console.info(data);

  // buy pizza utils
  const [buyPizzaOpen, setBuyPizzaOpen] = useState(false);
  const [pizzasAvailableToBuy, setPizzasAvailableToBuy] = useState<Pizza[]>([]);

  // log pizza utils
  const [logPizzaOpen, setLogPizzaOpen] = useState(false);
  const [pizzasAvailableToLog, setPizzasAvailableToLog] = useState<Pizza[]>([]);

  // history pizza utils
  const [historyPizzaOpen, setHistoryPizzaOpen] = useState(false);
  const [pizzaHistory, setPizzaHistory] = useState<PijjaDetailed[]>([]);

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
        label:
          user.user_name +
          ` - Wallet amount ${getRsFromPaise(user.wallet_amount)}`,
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
                  window.location.reload();
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
                    const response = await getAvailablePizzasToBuy();
                    setCurrentUser(user.user_id);
                    setPizzasAvailableToBuy(response.pizzas);
                    setBuyPizzaOpen(true);
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
              <div
                className="bttn"
                onClick={async () => {
                  try {
                    const response = await getPizzasAvailableToLog({
                      user_id: user.user_id,
                    });
                    setCurrentUser(user.user_id);
                    setPizzasAvailableToLog(response.pijjas);
                    setLogPizzaOpen(true);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                  <center>Log Pizza</center>
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={3} offset={1}>
              <div
                className="bttn"
                onClick={async () => {
                  try {
                    setCurrentUser(user.user_id);
                    const response = await getHistory(user.user_id);
                    setPizzaHistory(response);
                    setHistoryPizzaOpen(true);
                  } catch (error) {
                    console.error(error);
                    api.error({
                      message: `Error while fetching history for ${user.user_name}`,
                      placement: "topRight",
                    });
                  }
                }}
              >
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
              <BuyPizzaModal
                pizzas={pizzasAvailableToBuy}
                open={buyPizzaOpen}
                api={api}
                currUser={currUser}
                setOpen={(newState) => setBuyPizzaOpen(newState)}
                invalidateUser={() => {
                  setCurrentUser(undefined);
                  window.location.reload();
                }}
              />

              <LogPizzaModal
                open={logPizzaOpen}
                pizzas={pizzasAvailableToLog}
                setOpen={(newState) => setLogPizzaOpen(newState)}
                invalidateUser={() => setCurrentUser(undefined)}
                api={api}
                currUser={currUser}
              />
              <PizzaHistoryModal
                pizzas={pizzaHistory}
                setOpen={(newState) => setHistoryPizzaOpen(newState)}
                open={historyPizzaOpen}
                invalidateUser={() => setCurrentUser(undefined)}
                userDto={data.find((e) => currUser === e.user_id)}
              />
            </Col>
          </Row>
        </PageLayout>
      </>
    );
  } else {
    return <></>;
  }
};
