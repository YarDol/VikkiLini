import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { publicRequest } from "../apiRequest";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AllProducts = ({ path, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

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

  return (
    <Container>
      {filteredProducts.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default AllProducts;
