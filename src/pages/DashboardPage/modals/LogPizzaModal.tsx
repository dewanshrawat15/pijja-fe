import { Modal, Row, Col, Typography } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { buyPizza, logPizza } from "../../../common/api";
import { getRsFromPaise } from "../../../common/utils";
import { Pizza } from "../../../common/models";

interface Props {
  open: boolean;
  pizzas: Pizza[];
  setOpen: (newState: boolean) => void;
  invalidateUser: VoidFunction;
  api: NotificationInstance;
  currUser?: string | undefined;
}

export const LogPizzaModal = ({
  open,
  pizzas,
  api,
  currUser,
  setOpen,
  invalidateUser,
}: Props) => {
  return (
    <Modal
      title="Pizzas available to log"
      open={open}
      onOk={() => {
        // handle ok
        setOpen(false);
        invalidateUser();
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
                        await logPizza({
                          user_id: currUser,
                          pijja_id: pizza.pijja_id,
                        });
                        setOpen(false);
                        api.info({
                          message: `Pizza logged successfully`,
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
                    <center>Log Pizza</center>
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
