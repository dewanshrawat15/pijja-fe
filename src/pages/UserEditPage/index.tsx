import { Row, Col, Typography, Spin, notification, Input, Radio } from "antd";
import { updateUserDetails, useGetPlayerDetails } from "../../common/api";
import { PageLayout } from "../../components/PageLayout";
import { LoadingOutlined } from "@ant-design/icons";
import { GENDER } from "../../common/models";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserEditPage = () => {
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [gender, setGender] = useState<GENDER | undefined>();
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetPlayerDetails(userId);

  useEffect(() => {
    if (data?.data.user_name) {
      setName(data.data.user_name);
    }
    if (data?.data.gender) {
      setGender(data.data.gender);
    }
    if (data?.data.age) {
      setAge(data.data.age.toString());
    }
  }, [data]);

  if (userId === undefined) {
    alert("Incorrect navigation, return home");
    window.location.href = "/";
    return <></>;
  } else {
    const [api, contextHolder] = notification.useNotification();

    if (isLoading) {
      return (
        <PageLayout>
          <Row>
            <Col span={8} offset={2}>
              <Typography.Title
                level={3}
                style={{ margin: 0, color: "#15171c", cursor: "pointer" }}
              >
                Edit user
              </Typography.Title>
            </Col>
          </Row>
          <br />

          <Row>
            <Col span={15} offset={2}>
              <Row>
                <Col span={8} offset={8}>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
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
                Edit user
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
                  User Details Form
                </Typography.Title>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col span={8} offset={2}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={8} offset={2}>
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Col span={8} offset={2}>
                <Radio.Group
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <Radio value={GENDER.MALE}>Male</Radio>
                  <Radio value={GENDER.FEMALE}>Female</Radio>
                  <Radio value={GENDER.NONE}>Prefer not to say</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <br />
            <br />

            <Row>
              <Col span={3} offset={2}>
                <div
                  className="bttn"
                  onClick={async () => {
                    if (name && age && gender) {
                      const response = await updateUserDetails(userId, {
                        user_name: name,
                        age: parseInt(age),
                        gender: gender,
                      });
                      api.info({
                        message: response.message,
                        placement: "topRight",
                      });
                    } else {
                      api.error({
                        message: `Something went wrong, check all details`,
                        placement: "topRight",
                      });
                    }
                  }}
                >
                  <center>
                    <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                      Submit
                    </Typography.Paragraph>
                  </center>
                </div>
              </Col>
            </Row>
          </PageLayout>
        </>
      );
    } else {
      return <></>;
    }
  }
};
