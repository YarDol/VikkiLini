import React from "react";
import Promotion from "../components/Promotion";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import PopularProducts from "../components/PopularProducts";
import Carousel from "../components/Carousel";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const Home = () => {
  const location = useLocation();
  const path = location.pathname; 
  const {t} = useTranslation();
  return (
    <div>
      <Promotion />
      <Navbar />
      <Carousel /> 
      <Categories />
      <PopularProducts path={path} description={t('hot')} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;