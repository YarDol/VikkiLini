import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import Warning from "../components/Modal/Warning";
import { mobile } from "../responsive";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import '../styles/dark.scss'

const Container = styled.div``;
const MainContainer = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;
const Button = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;
const Title = styled.h1`
  padding-top: 55px;
  font-weight: 300;
  ${mobile({ paddingTop: "30px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
`;

const AllProducts = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
    <Container>
      <Warning />
      <MainContainer>
        <Title>ALL PRODUCTS</Title>
        <TextContainer style={{ paddingTop: "20px" }}>
          <Left>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              className={`back-button`}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Button>
          </Left>
          <Right>
            <Button
              onClick={() => {
                navigate("/newproduct");
              }}
              className={`back-button`}
            >
              <AddIcon />
              <Text>add product</Text>
            </Button>
          </Right>
        </TextContainer>
        <ProductList />
      </MainContainer>
    </Container>
    </div>
  );
};

export default AllProducts;