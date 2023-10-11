import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { publicRequest } from "../apiRequest";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const page404Styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  flexDirection: "column",
  textAlign: "center",
};

const AllProducts = ({ path, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          path.includes("men")
            ? `products?category=${path}`
            : path === "vikkilini"
            ? "products?brand=vikkilini"
            : path.includes("men") === false && path !== "instock"
            ? `products?brand=${path}`
            : path === "instock"
            ? "products?instock"
            : "products/"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [path]);

  useEffect(() => {
    path &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, path, filters]);

  useEffect(() => {
    if (sort === "oldest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a._id.localeCompare(b._id))
      );
    } else if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b._id.localeCompare(a._id))
      );
    } else if (sort === "lowest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "highest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  function isPathValid(path) {
    if(path === "men" || path === "women" || path === "instock"){
      return true;
    }else{
      return false;
    }
  }
  
  const pathIsValid = isPathValid(path);

  return (
    <Container>
      {pathIsValid ? (
      filteredProducts.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))
    ) : (
      <div style={page404Styles}>
            <p>{t('page404p')}</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">{t('btm')}</Link>
        </div>
    )}
    </Container>
  );
};

export default AllProducts;
