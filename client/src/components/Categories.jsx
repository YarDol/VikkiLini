import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  margin: 20px auto;
  max-width: 1290px;
  width: 90vw;
  padding: 20px 0;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Categories = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>VikkiLini {t('partner')}</Title>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} id={item.id} />
        ))}
      </Wrapper>
    </Container>
  );
};


export default Categories;