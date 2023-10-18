import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserMobileModal } from "../components/Modal/UserModal";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { MenuList } from "./NavigationLinks";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import cookies from "js-cookie"; 

const Container = styled.div`
  z-index: 5;
  display: none;
  width: 100vw;
  ${tablet({ display: "flex" })}
  ${mobile({ display: "flex" })};
`;

const Left = styled.div`
  flex: 1;
  text-align: left;
  margin: auto;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`;

const OverlayContainer = styled.div`
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 3;
  left: ${(prop) => prop.left};
  right: ${(prop) => prop.right};
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;
  transition: 0.5s;
`;

const OverlayContent = styled.div`
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

const OverlayItem = styled.div`
  padding: 10px;
  font-weight: 900;
  text-decoration: none;
  width: 50vw;
  border-radius: 40px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  display: block;
  transition: 0.6s;
`;

const Top = styled.div`
  position: absolute;
  color: #fff;
  top: 15vh;
  cursor: pointer;
  text-align: center;
  width: 50vw;
`;

const CloseLeft = styled.div`
  position: absolute;
  cursor: pointer;
  top: 9px;
  left: 10px;
  color: #fff;
  font-size: 24px;
`;

const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

const LanguageSelect = styled.select`
  padding: 10px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  width: 60px;
`;

const MobileNavbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const overlayContainerRef = useRef(null);
  const { t } = useTranslation();

  const languages = [
    {
      code: 'ua',
      country_code: 'UA',
      name: 'Ukraine'
    },
    {
      code: 'en',
      country_code: 'EN',
      name: 'English'
    },
  ];

  const currentLanguageCode = cookies.get('i18next') || 'en';

  useEffect(() => {
    const closeOverlayOnOutsideClick = (e) => {
      if (overlayContainerRef.current && !overlayContainerRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", closeOverlayOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeOverlayOnOutsideClick);
    };
  }, [openMenu]);

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <Container>
      <Left>
        <MenuItem>
          <MenuIcon onClick={handleMenu} />
        </MenuItem>
      </Left>
      <Center onClick={() => navigate("/")}>
        <Logo>VikkiLini</Logo>
      </Center>
      <Right>
        <LanguageSelect
          value={currentLanguageCode}
          onChange={(e) => {
            const selectedLanguageCode = e.target.value;
            i18next.changeLanguage(selectedLanguageCode);
          }}
        >
          {languages.map(({ code, country_code }) => (
            <option
              key={code}
              value={code}
              style={{
                backgroundColor: "black",
                color: currentLanguageCode === code ? "#808080" : "white",
                fontSize: "17px",
                padding: "30px",
              }}
            >
              {country_code}
            </option>
          ))}
        </LanguageSelect>
        {user !== null ? (
          <MenuItem>
            <UserMobileModal />
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
      <OverlayContainer
        ref={overlayContainerRef}
        left={"0"}
        right={"auto"}
        style={openMenu ? { width: "50%" } : { width: "0%" }}
      >
        <CloseLeft>
          <CloseIcon onClick={handleMenu} />
        </CloseLeft>
        <Top>
          <Logo>{t('menu')}</Logo>
        </Top>
        {MenuList.map((menu, index) => {
          return (
            <OverlayContent key={index}>
              <OverlayItem
                id={menu.id}
                onClick={() => {
                  navigate(`${menu.path}`);
                  setOpenMenu(false); // Close the overlay when a category is selected.
                }}
              >
                {menu.title}
              </OverlayItem>
            </OverlayContent>
          );
        })}
      </OverlayContainer>
    </Container>
  );
};

export default MobileNavbar;
