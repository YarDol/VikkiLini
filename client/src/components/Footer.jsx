import {
    Instagram,
    MailOutline,
    Phone,
    Room,
    Twitter,
  } from "@mui/icons-material";
  import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
  import styled from "styled-components";
  import { mobile, tablet, bigtablet } from "../responsive";
  import { useTranslation } from "react-i18next";

  const MainContainer = styled.div`
    background-color: #110f12;
    color: white;
    margin: auto;
    width: 100vw;
    ${mobile({ flexDirection: "column" })}
  `;
  const Container = styled.div`
    margin: auto;
    width: 90vw;
    max-width: 1295px;
    background-color: #110f12;
    color: white;
    display: flex;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${bigtablet({ padding: "10px" })}
    ${tablet({ padding: "5px" })}
    ${mobile({ padding: "5px" })}
  `;
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${tablet({ padding: "5px" })}
    ${mobile({ padding: "5px" })}
  `;
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    justify-content: center;
    ${tablet({ padding: "5px" })}
    ${mobile({ padding: "5px" })}
  `;
  
  const SocialContainer = styled.div`
    align-items: center;
    display: flex;
  `;
  
  const SocialIcon = styled.span`
    width: 40px;
    cursor: pointer;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    ${tablet({ marginRight: "5px" })}
  `;
  const Icon = styled.span`
    width: 25px;
    cursor: pointer;
    height: 25px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    ${bigtablet({ marginRight: "10px", height: "20px" })}
    ${tablet({ display: "none" })}
  `;
  const StoreContainer = styled.div`
    display: flex;
    cursor:pointer;
  `;
  
  const Store = styled.img`
    width: 100px;
    cursor: pointer;
    display: flex;
    margin-right: 15px;
    ${bigtablet({ width: "90px" })}
    ${tablet({ marginRight: "10px", width: "65px" })}
  `;
  
  const Title = styled.h3`
    font-size: 1rem;
    margin-bottom: 30px;
    ${tablet({ marginBottom: "10px", fontSize: "0.85rem" })}
    ${mobile({ marginBottom: "10px", fontSize: "0.85rem" })}
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    font-size: 12px;
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: lightgrey;
    }
    ${tablet({ marginBottom: "5px", flexWrap: "wrap", fontSize: "10px" })}
    ${mobile({ marginBottom: "5px", fontSize: "10px" })}
  `;
  
  const ContactItem = styled.div`
    font-size: 12px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    ${tablet({ marginBottom: "10px", flexWrap: "wrap", fontSize: "10px" })}
    ${mobile({ marginBottom: "5px", fontSize: "10px" })}
  `;
  const Hr = styled.hr`
    width: 90vw;
    max-width: 1295px;
    margin: auto;
    border: none;
    height: 0.5px;
    background-color: grey;
  `;
  const Bottom = styled.div`
    font-size: 10px;
    color: white;
    margin: auto;
    padding: 10px 0 20px 0;
    width: 100vw;
    text-align: center;
  `;
  
  const Footer = () => {
    const year = new Date().getFullYear();
    const {t} = useTranslation();
    return (
      <MainContainer>
        <Container style={{ paddingTop: "3vh" }}>
          <Left>
            <Title>{t('futer.abv')}</Title>
            <List>
              <ListItem>{t('futer.abus')}</ListItem>
              <ListItem>{t('futer.os')}</ListItem>
              <ListItem>{t('futer.car')}</ListItem>
              <ListItem>{t('futer.pp')}</ListItem>
              <ListItem>{t('futer.afp')}</ListItem>
              <ListItem>{t('futer.products')}</ListItem>
            </List>
          </Left>
          <Center>
            <Title>{t('futer.cus')}</Title>
            <List>
              <ListItem>{t('futer.ods')}</ListItem>
              <ListItem>{t('futer.pos')}</ListItem>
              <ListItem>{t('futer.cos')}</ListItem>
              <ListItem>{t('futer.ref')}</ListItem>
              <ListItem>{t('futer.help')}</ListItem>
              <ListItem>{t('futer.faq')}</ListItem>
            </List>
          </Center>
          <Right>
            <Title>{t('futer.com')}</Title>
            <List>
              <ListItem>{t('futer.ow')}</ListItem>
              <ListItem>{t('futer.ev')}</ListItem>
              <ListItem>{t('futer.ns')}</ListItem>
              <ListItem>{t('futer.env')}</ListItem>
              <ListItem>{t('futer.cc')}</ListItem>
              <ListItem>{t('futer.dc')}</ListItem>
            </List>
          </Right>
        </Container>
        <Container>
          <Left>
            <Title>{t('futer.ct')}</Title>
            <ContactItem>
              <Icon>
                <Room />
              </Icon>
              {t('futer.street')}
            </ContactItem>
            <ContactItem>
              <Icon>
                <Phone />
              </Icon>{" "}
              (068) 147 35 06
            </ContactItem>
            <ContactItem>
              <Icon>
                <MailOutline /> 
              </Icon>{" "}
              vikkilini_oficcial@gmail.com
            </ContactItem>
          </Left>
          <Center>
            <Title>{t('futer.fos')}</Title>
            <SocialContainer>
              <SocialIcon>
                <FacebookOutlinedIcon />
              </SocialIcon>
              <SocialIcon>
                <Instagram />
              </SocialIcon>
              <SocialIcon>
                <Twitter />
              </SocialIcon>
            </SocialContainer>
          </Center>
          <Right>
            <Title>{t('futer.gao')}</Title>
            <StoreContainer>
              <Store src={"https://i.ibb.co/jyd1btW/google-play-png-logo-3799.png"} />
              <Store src={"https://i.ibb.co/kXKGZcw/app-store-png-logo-33107.png"} />
            </StoreContainer>
          </Right>
        </Container> 
        <Hr />
        <Bottom>Copyright &copy; {year} VikkiLini.</Bottom>
      </MainContainer>
    );
  };
  
  export default Footer;