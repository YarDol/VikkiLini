import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import FailedModal from "../components/Modal/FailedModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Promotion from "../components/Promotion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div``;
const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  color: black;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  padding: 20px;
  ${mobile({ width: "300px", flexDirection: "column" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Message = styled.div`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: green;
  ${mobile({ flex: "5" })}
`;

const InputField = styled.input`
  flex: 1;
  width: 85%;
  min-width: 40%;
  margin: 10px auto;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid lightgrey;
  ${mobile({ width: "100%" })};
`;
const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 10px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 5px auto;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;
const Options = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const {id, token} = useParams();
  const { isFetching, error } = useSelector((state) => state.user);
  const {t} = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await axios.post(
    //     `http://localhost:5000/api/auth/forget-password/${id}/${token}`,
    //     input
    //   );
    const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}auth/forget-password/${id}/${token}`,
            input
          );
      if (res.status === 200) {
        setSend(true);
      }
  };
  useEffect(() => {
    if (send) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [send, navigate]);
  
  return (
    <Container>
      <FailedModal display={error === false ? "none" : "flex"} />
      <Promotion />
      <Navbar />
      <MainContainer>
        <Title>{t('new_pass_title')}</Title>
        <Wrapper>
          <Form>
          <InputField
                type="password"
                placeholder="password"
                value={input.newPassword}
                onChange={(e) => setInput({...input, [e.target.name]: e.target.value})}
                required
                minLength={8}
                name="newPassword"
            />
            <InputField
                type="password"
                placeholder="confirm password"
                value={input.confirmPassword}
                onChange={(e) => setInput({...input, [e.target.name]: e.target.value})}
                required
                minLength={8}
                name="confirmPassword"
            />
            <Button onClick={handleSubmit} disabled={isFetching ? true : false}>
            {t('chg_pass')}
            </Button>
          </Form>
          {send ? ( 
          <Message>{t('new_pass_scc')}</Message>
        ) : null}
          <Options
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            {t('back')}
          </Options>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default ForgetPassword;