import styled from "styled-components";
import { mobile } from "../../responsive";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #f8f8f8;
  position: fixed;
  display: ${(prop) => prop.display};
  justify-content: center;
  align-items: center;
`;

const Header = styled.h3`
  font-size: 1.5rem;
  ${mobile({ fontSize: "1rem" })};
`;

const Processing = ({ display }) => {
  const {t} = useTranslation();
  return (
    <Container display={display}>
      <Header>{t('payment')}</Header>
    </Container>
  );
};
 
export default Processing;