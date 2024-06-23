import { Badge } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState } from "react";
import styled from "styled-components";
import MobileNavbar from "./MobileNavbar";
import { useNavigate, Link } from "react-router-dom";
import { mobile, tablet } from "../responsive";
import { UserModal } from "../components/Modal/UserModal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import MenuSections from "../components/Modal/MenuSections";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #110f12;
  color: white;
  ${tablet({ height: "53px" })};
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1290px;
  width: 90vw;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;
const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
`;

const Center = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;
const MenuLinks = styled.h3`
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: -30%;
    width: 0;
    height: 3px;
    background-color: coral;
    transition: width 0.2s ease-out;
  }
  &:hover:before {
    width: 100%;
    left: 0;
    right: auto;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const bagQuantity = useSelector((state) => state.bag.quantity);
  const wish = useSelector((state) => state.wish.wishlist);
  const [sections, setSections] = useState({ men: [], women: [], instock: [] });

  const handleSectionsLoad = (sectionsData) => {
    setSections(sectionsData);
  };

  const { t } = useTranslation();

  const languages = [
    {
      code: "ua",
      country_code: "UA",
      name: "Ukrainian",
    },
    {
      code: "en",
      country_code: "EN",
      name: "English",
    },
  ];

  const currentLanguageCode = cookies.get("i18next") || "en";

  return (
    <Container>
      <Wrapper>
        <Left onClick={() => navigate("/")}>
          <Logo>V i k k i L i n i</Logo>
        </Left>
        <Center>
          {sections.men.length > 0 && (
            <MenuLinks onClick={() => navigate("/")}>
              {t("categories.home")}
            </MenuLinks>
          )}
          {sections.men.length > 0 && (
            <MenuLinks onClick={() => navigate("/products/men")}>
              {t("categories.men")}
            </MenuLinks>
          )}
          {sections.women.length > 0 && (
            <MenuLinks onClick={() => navigate("/products/women")}>
              {t("categories.women")}
            </MenuLinks>
          )}
          {sections.instock.length > 0 && (
            <MenuLinks onClick={() => navigate("/products/instock")}>
              <Link
                to="/brands"
                style={{ textDecoration: "none", color: "white" }}
              >
                {t("categories.brand")}
              </Link>
            </MenuLinks>
          )}
          <MenuLinks onClick={() => navigate("/live")}>{t("live")}</MenuLinks>
        </Center>
        <Right>
          {user !== null && (
            <MenuItem>
              <Badge badgeContent={wish?.length} color="warning">
                <FavoriteBorderOutlinedIcon
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                />
              </Badge>
            </MenuItem>
          )}
          <MenuItem>
            <Badge badgeContent={bagQuantity} color="warning">
              <ShoppingBagOutlinedIcon
                onClick={() => {
                  navigate("/bag");
                }}
              />
            </Badge>
          </MenuItem>
          <select
            value={currentLanguageCode}
            onChange={(e) => {
              const selectedLanguageCode = e.target.value;
              i18next.changeLanguage(selectedLanguageCode);
            }}
            style={{
              padding: "10px",
              background: "none",
              border: "none", // Видалено рамку
              color: "#fff",
              cursor: "pointer",
              outline: "none", // Видалити рамку (outline) при фокусі
              fontWeight: "bold",
              width: "60px",
            }}
          >
            {languages.map(({ code, country_code }) => (
              <option
                key={code}
                value={code}
                style={{
                  backgroundColor: "black", // Видалено помаранчевий колір
                  color: currentLanguageCode === code ? "#808080" : "white",
                  fontSize: "17px", // Збільшити розмір тексту для конкретних елементів
                  padding: "30px", // Збільшений padding для конкретних елементів
                }}
              >
                {country_code}
              </option>
            ))}
          </select>
          {user !== null ? (
            <MenuItem>
              <UserModal />
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              {t("signin.2")}
            </MenuItem>
          )}
        </Right>
        <MobileNavbar />
        <MenuSections onSectionsLoad={handleSectionsLoad} />
      </Wrapper>
    </Container>
  );
};

export default Navbar;
