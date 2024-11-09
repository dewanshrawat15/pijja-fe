import React, { useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { Row, Col, Input, Radio, Typography } from "antd";
import { GENDER } from "../../common/models";
import { createNewUser } from "../../common/api";

export const UserPage: React.FC = () => {
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [gender, setGender] = useState<GENDER | undefined>();

  const handleUserCreation = async () => {
    if (name !== undefined && age !== undefined && gender !== undefined) {
      await createNewUser({
        user_name: name,
        age: parseInt(age),
        gender: gender,
      });
      alert("User has been created");
    } else {
      alert("Please fill all details");
    }
  };

  return (
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
          <Input onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={8} offset={2}>
          <Input onChange={(e) => setAge(e.target.value)} placeholder="Age" />
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
          <div className="bttn" onClick={handleUserCreation}>
            <center>
              <Typography.Paragraph style={{ margin: 0, color: "#FFF" }}>
                Submit
              </Typography.Paragraph>
            </center>
          </div>
        </Col>
      </Row>
    </PageLayout>
  );
};

// export const LeaderboardPage = () => {
//   return <div>Leaderboard</div>;
// };
