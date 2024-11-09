import React from "react";
import { Col, Layout, Menu, Row, theme, Typography } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/PageLayout";

const { Header } = Layout;

export const LeaderboardPage: React.FC = () => {
  const navigateTo = useNavigate();

  const navigateToHome = () => {
    navigateTo("/");
  };

  return (
    <PageLayout>
      <p>Leaderpage working on</p>
    </PageLayout>
  );
};

// export const LeaderboardPage = () => {
//   return <div>Leaderboard</div>;
// };
