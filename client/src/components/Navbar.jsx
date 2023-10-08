import { Badge } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState } from "react";
import styled from "styled-components";
import MobileNavbar from "./MobileNavbar";
import { MenuList } from "./NavigationLinks";
import { useNavigate } from "react-router-dom";
import { mobile, tablet } from "../responsive";
import BrandModal from "./Modal/NavbarModal";
import { UserModal } from "../components/Modal/UserModal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import cookies from "js-cookie"; 

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
const Modal = styled.div``;
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
    left: 0%;
    right: auto;
  }
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;


const Navbar = () => {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const bagQuantity = useSelector((state) => state.bag.quantity);
  const wish = useSelector((state) => state.wish.wishlist);
  const handleHover = (e) => {
    let hovered = Number(e.target.id);
    setHover(hovered);
  };
  const handleMouseOut = (e) => {
    setHover(0);
  };


const {t} = useTranslation();

const languages = [
  {
    code: 'ua',
    country_code: 'UA',
    name: 'Ukrainian'
  },
  {
    code: 'en',
    country_code: 'EN',
    name: 'English'
  },]

  const currentLanguageCode = cookies.get('i18next') || 'en'

  return (
    <Container>
      <Wrapper>
        <Left onClick={() => navigate("/")}>
          <Logo>V i k k i L i n i</Logo>
        </Left>
        {MenuList.map((menu, index) => {
          return (
            <Center key={index}>
              <MenuLinks
                id={menu.id}
                onMouseEnter={handleHover}
                value={menu.title}
                key={index}
                onClick={() => {
                  navigate(`${menu.path}`);
                }}>  
                {menu.title}
              </MenuLinks>
              
            </Center>
          );
        })}
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
                width: "60px"
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
              }}>
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
              {t('signin.2')}
            </MenuItem>
          )}
        </Right>
        <MobileNavbar />
      </Wrapper>
      <Modal onMouseLeave={handleMouseOut}>
        {hover === 3 && <BrandModal />}
      </Modal>
    </Container>
  );
};

export default Navbar;