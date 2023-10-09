import styled from "styled-components";
import Navbar from "../components/Navbar";
import Promotion from "../components/Promotion";
import AllProducts from "../components/AllProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div``;
const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;

const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px 0;
  ${mobile({ display: "flex", flexWrap: "wrap" })}
`;

const FilterText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin: auto 0;
  padding-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  disabled: ${(props) => props.disabled};
`;
const Option = styled.option`
  background-color: white;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  padding: 10px;
  color: grey;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: black;
    text-decoration: underline;
  }
`;
const ProductList = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const {t} = useTranslation();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
    console.log(value);
  };
  const reset = (e) => {
    setSort();
    setFilters({});
  };

  return (
    <Container>
      <Promotion />
      <Navbar />
      <Wrapper>
        {path !== "instock" ? (
          <Title>{path.toUpperCase()} </Title>
        ) : (
          <Title>{t('alp')}</Title>
        )}
        <FilterContainer>
          <Filter>
            <FilterText>{t('filter')}</FilterText>
            <Select
              name="category"
              onChange={handleFilters}
            >
              <Option value="men">{t('men')}</Option>
              <Option value="women">{t('women')}</Option>
            </Select>
            <Select
              name="brand"
              onChange={handleFilters}
            >
              <Option value="vikkilini">VikkiLini</Option>
              <Option value="vovk">Vovk</Option>
              <Option value="bevza">BEVZA</Option>
              <Option value="ienki">IENKI</Option> 
              <Option value="mida">Mida</Option> 
            </Select>
            <Select name="sort" onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">{t('new')}</Option>
              <Option value="oldest">{t('old')}</Option>
              <Option value="ascending">{t('asc')}</Option>
              <Option value="descending">{t('dsc')}</Option>
              <Option value="lowest">{t('htl')}</Option>
              <Option value="highest">{t('lth')}</Option>
            </Select>
            <Button onClick={reset}>{t('clf')}</Button>
          </Filter>
        </FilterContainer>
        <AllProducts path={path} filters={filters} sort={sort} />
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  ); 
};

export default ProductList;