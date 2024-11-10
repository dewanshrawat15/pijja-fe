import { Modal, Row, Col } from "antd";
import {
  buildDateStringFromEpoch,
  getRsFromPaise,
} from "../../../common/utils";
import { PijjaDetailed, Pizza, UserDTO } from "../../../common/models";

interface Props {
  open: boolean;
  pizzas: PijjaDetailed[];
  setOpen: (newState: boolean) => void;
  invalidateUser: VoidFunction;
  userDto: UserDTO | undefined;
}

export const PizzaHistoryModal = ({
  open,
  pizzas,
  userDto,
  setOpen,
  invalidateUser,
}: Props) => {
  if (userDto) {
    return (
      <Modal
        title="Pizza History"
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

        <Row
          style={{
            alignItems: "center",
          }}
        >
          <Col span={12}>{}</Col>
        </Row>
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
              </Row>
              <Row
                style={{
                  alignItems: "center",
                }}
              >
                <Col span={12}>
                  {buildDateStringFromEpoch(pizza.last_modified_at)}
                </Col>
              </Row>
              <br />
            </>
          );
        })}
      </Modal>
    );
  } else {
    return <></>;
  }
};
