import styled from "styled-components";
import { mobile, tablet, bigtablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 550px;
  display: flex;
  align-items: center;
  position: relative;
  ${bigtablet({ height: "500px", minWidth: "330px" })}
  ${tablet({ height: "400px", minWidth: "300px" })}
  ${mobile({ margin: "5px 0", height: "250px", minWidth: "220px" })}
`;

const Image = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  
  margin-bottom: 20px;
  background-color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.9s ease-out;
  &:hover {
    opacity: 0.4;
    color: RosyBrown;
    transform: scale(1.01);
  }
  padding: 7px 15px;
  cursor: pointer;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.9;
    color: black;
    transform: scale(1.01);
  }
`;

const CategoryItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = () => {
    if (item.id < 4) {
      setShowButton(true);
    }
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  return (
    <Container
      key={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        {showButton && (
          <Button onClick={() => navigate(`/products/${item.path}`)}>
            {t('shnow')}
          </Button>
        )}
      </Info>
    </Container>
  );
};



export default CategoryItem;