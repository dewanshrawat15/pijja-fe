import { Col, Modal, Row, Typography } from "antd";
import { Pizza } from "../../../common/models";
import { buyPizza } from "../../../common/api";
import { getRsFromPaise } from "../../../common/utils";
import { NotificationInstance } from "antd/es/notification/interface";

interface Props {
  pizzas: Pizza[];
  open: boolean;
  api: NotificationInstance;
  currUser?: string | undefined;
  invalidateUser: VoidFunction;
  setOpen: (newState: boolean) => void;
}

export const BuyPizzaModal = ({
  api,
  pizzas,
  open,
  currUser,
  setOpen,
  invalidateUser,
}: Props) => {
  return (
    <Modal
      title="Pizzas available to buy"
      open={open}
      onOk={() => {
        // handle ok
        invalidateUser();
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <br />
      {pizzas.map((pizza, index) => {
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
                  <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
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
  );
};
