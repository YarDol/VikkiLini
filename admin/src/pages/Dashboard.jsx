import FeaturedInfo from "../components/FeaturedInfo";
import NewMembers from "../components/NewMembers";
import NewOrders from "../components/NewOrders";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const Title = styled.h1`

  font-weight: 300;
  ${mobile({ padding: "10px 0" })}
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start; /* Це допоможе New Members бути лівіше інших компонентів */
  ${mobile({ flexDirection: "column" })}
`;

const FeaturedInfoContainer = styled.div`
  flex: 1;
`;

const Sidebar = styled.div`
  width: 311px;
  ${mobile({ width: "100%" })}
`;

const Widget = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
`;

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
        <Container>
          <Title className="text">DASHBOARD</Title>
          <MainContent>
            <Sidebar>
            <Widget className={`widget`}>
            Switch between colour themes for more comfort
              </Widget>
              <Widget className={`widget`}>
                <NewMembers/>
              </Widget>
            </Sidebar>
            <FeaturedInfoContainer>
              <Widget className={`widget`}>
                <FeaturedInfo />
              </Widget>
              <Widget className={`widget`}>
                <NewOrders />
              </Widget>
            </FeaturedInfoContainer>
          </MainContent>
        </Container>
      </div>
  );
};

export default Dashboard;
