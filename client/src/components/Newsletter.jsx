import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Container = styled.div`
  height: 55vh;
  background-color: #f0f1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "50vh" })}
  ${mobile({ height: "40vh" })}
`;
const Title = styled.h1`
  font-size: 48px;
  ${tablet({ fontSize: "32px" })}
  ${mobile({ fontSize: "24px" })}
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  max-width: 800px;
  text-align: center;
  margin: 30px auto;
  ${tablet({ textAlign: "center", fontSize: "14px", width: "80%" })}
  ${mobile({ textAlign: "center", fontSize: "14px", width: "80%" })}
`;

const InputContainer = styled.div`
  width: 50vw;
  max-width: 800px;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 30px;
  ${tablet({ width: "80%", justifyContent: "center" })}
  ${mobile({ width: "80%", justifyContent: "center" })}
`;

const Input = styled.input`
  text-indent: 10px;
  border-radius: 30px;
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none !important;
  }
  ${mobile({ flex: "5" })}
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  flex: 1;
  border: none;
  background-color: white;
  display: flex;
  align-items: center; /* Вирівнювання стрілки по вертикалі */
  justify-content: center; /* Вирівнювання стрілки по горизонталі */
`;

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_PUBLIC_KEY);
      console.log('Email:', email);
    } else {
      console.log('Invalid email');
    }
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <Container>
      <Title>{t('sbp')}</Title>
      <Text>
        {t('subscr')}
      </Text>
      <form onSubmit={sendEmail}>
        <InputContainer>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button>
          <ArrowForwardIcon />
        </Button>
        </InputContainer>
      </form>
    </Container>
  );
};

export default Newsletter;
