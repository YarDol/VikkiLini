import styled from "styled-components";
import Promotion from "../components/Promotion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Processing from "../components/Modal/Processing";
import Notification from "../components/Modal/Notification";
import { mobile, tablet, bigtablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatAmount } from "../utility/formatAmount";
import { userRequest } from "../apiRequest";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StripeCheckout from "react-stripe-checkout";
import {
  addProductQuantity,
  subtractProductQuantity,
  removeProduct,
} from "../redux/bagRedux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
  ${tablet({ flex: "3" })}
  ${mobile({ padding: "0", flexWrap: "wrap", minWidth: "120px" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  ${tablet({ flex: "0.75" })}
  ${mobile({ flex: "1", padding: "0" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ flex: "0.75" })}
  ${mobile({ padding: "0" })}
`;

const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  text-align: center;
  ${mobile({ fontSize: "0.8rem" })};
`;
const Action = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
  ${mobile({ paddingTop: "20px" })}
`;
const BagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", paddingTop: "20px" })}
`;

const ProductContainer = styled.div`
  flex: 2.5;
  ${bigtablet({ flex: "2" })}
  ${tablet({ flex: "2" })}
`;

const Item = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  ${mobile({ paddingTop: "10px" })};
`;
const Info = styled.div`
  flex: 1;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "0" })}
`;
const Details = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
`;
const ProductDetails = styled.div`
  min-width: 240px;
  padding: 0 10px;
  flex: 1;
  ${mobile({ minWidth: "120px" })}
`;
const ProductImage = styled.div`
  width: 140px;
  height: 170px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  background-color: #efefef;
  margin: auto;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  ${bigtablet({ width: "100px", flex: "1" })}
  ${mobile({ width: "70px", height: "100px" })}
`;

const Image = styled.img`
  width: 80%;
  margin: auto;
`;
const ProductName = styled.h3`
  font-size: 1rem;
  ${mobile({ fontSize: "0.85rem" })}
`;
const ProductInfo = styled.p`
  font-size: 0.85rem;
  margin: 2px 0;
  color: gray;
  ${mobile({ fontSize: "0.8rem" })}
`;

const ProductColor = styled.div`
  flex: 1;
`;
const ColorOutline = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  border: 1px solid black;
  ${mobile({
    width: "15px",
    height: "15px",
  })}
`;
const BoxColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${mobile({
    width: "13px",
    height: "13px",
  })}
`;
const RemoveContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 5px;
`;
const Remove = styled.p`
  color: grey;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.span`
  width: 40px;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    fontSize: "0.8rem",
    width: "30px",
    height: "25px",
    borderRadius: "8px",
    marginLeft: "3px",
  })}
`;
const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  margin: 0 5px;
  background-color: white;
  color: ${(prop) => prop.color};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: scale(1.2);
  ${mobile({
    transform: "scale(0.75)",
    margin: "0",
    width: "20px",
  })}
`;
const ProductPrice = styled.p`
  align-items: center;
  justify-content: center;
  font-weight: 200;
  flex: 1;
  font-size: 1rem;
  ${mobile({ fontSize: "0.9rem" })}
`;

const SummaryContainer = styled.div`
  flex: 1;
  padding-left: 40px;
  ${tablet({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;
const Summary = styled.div``;

const Subtitle = styled.h2`
  font-weight: 200;
  padding: 10px 0;
  font-size: 20px;
  ${mobile({ fontSize: "18px", padding: "5px 0" })}
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.font === "total" && "500"};
  font-size: ${(props) => props.font === "total" && "24px"};
  ${bigtablet({
    fontSize: (props) => (props.font === "total" ? "20px" : "16px"),
  })}
  ${tablet({ marginTop: "15px 0" })}
  ${mobile({ fontSize: (props) => (props.font === "total" ? "18px" : "14px") })}
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const CheckOut = styled.div`
  display: flex;
  margin-top: 20px;
  padding-left: 40px;
  justify-content: center;
  align-items: center;
  ${tablet({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  width: 120px;
  background-color: #110f12;
  color: white;
  cursor: pointer;
  padding: 10px;
  margin: auto;
  ${mobile({ margin: "10px" })}
`;
const Copy = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #c0c0c0;
  &:hover {
    color: #505050;
  }
`;
const Hr = styled.hr`
  background-color: #eee;
  margin-top: 5px;
  border: none;
  height: ${(props) => props.height};
  ${mobile({ margin: "10px 0" })}
`;
const DeleteConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmationBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  max-width: 300px;
`;

const ConfirmationText = styled.p`
  margin-bottom: 20px;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConfirmationButton = styled.button`
  padding: 10px 20px;
  background: #110f12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
`;

const Bag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bag = useSelector((state) => state.bag);
  const [processing, setProcessing] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const [copy, setCopy] = useState(false);
  const [remove, setRemove] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const handleQuantity = (type, product) => {
    const price = product.price;
    if (type === "Add" && product.quantity < 10) {
      dispatch(addProductQuantity({ product, price }));
    } else if (type === "Subtract" && product.quantity > 1) {
      dispatch(subtractProductQuantity({ product, price }));
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("4242 4242 4242 4242");
    setCopy(true);
  };
  const handleRemove = (product) => {
    showDeleteConfirmationModal(product);
  };
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      setProcessing(true);
      try {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: bag.total * 100,
        });
        const data = res.data;
        const bagState = { data, bag };
        navigate("/success", { state: bagState });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate, bag.total, bag, dispatch]);
  const showDeleteConfirmationModal = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = () => {
    // Ваш код для видалення товару
    const price = productToDelete.price;
    const quantity = productToDelete.quantity;
    dispatch(removeProduct({ product: productToDelete, price, quantity }));
    setProductToDelete(null);
    setShowDeleteConfirmation(false);
  };
  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteConfirmation(false);
  };
  const shipping = bag.total > 199 ? 0 : 10;
  const totalAmount = bag.total + shipping;
  const {t} = useTranslation();
  return (
    <Container>
      <Notification open={copy} setOpen={setCopy} type="copy" />
      <Notification open={remove} setOpen={setRemove} type="remove" />
      <Processing display={processing ? "flex" : "none"} />
      <Promotion />
      <Navbar />
      <Wrapper>
        <Title>{t('shB')}</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate('/');
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text style={{ marginLeft: "5px" }}>{t('back')}</Text>
            </Action>
          </Left>
        </TextContainer>
        <BagContainer>
          <ProductContainer>
            <Subtitle>{t('clB')}</Subtitle>
            <TextContainer>
              <Left>
                <Text>{t('product')}</Text>
              </Left>
              <Center>
                <Text>{t('qty')}</Text>
              </Center>
              <Right>
                <Text>{t('subt')}</Text>
              </Right>
            </TextContainer>
            <Hr height={"3px"} />
            {bag.quantity === 0 && (
              <TextContainer style={{ margin: "50px auto" }}>
                <Text>{t('ybie')}</Text>
              </TextContainer>
            )}
            {bag.products.map((product) => (
              <Item
                key={product._id + product.color + product.size}
                id={product._id}
              >
                <Info>
                  <Product>
                    <Left>
                      <Details>
                        <ProductImage
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <Image src={product.img} />
                        </ProductImage>
                        <ProductDetails>
                          <ProductName>{product.name}</ProductName>
                          <ProductInfo>{product.brand}</ProductInfo>
                          <ProductInfo> {product.size} US</ProductInfo>
                          <ProductColor>
                            <ColorOutline>
                              <BoxColor color={product.color} />
                            </ColorOutline>
                          </ProductColor>
                          <RemoveContainer>
                            <Remove onClick={() => handleRemove(product)}>
                              {t('remove')}
                            </Remove>
                          </RemoveContainer>
                        </ProductDetails>
                      </Details>
                    </Left>
                    <Center>
                      <QuantityWrapper>
                        <QuantityButton
                          color={
                            product.quantity === 1 ? "lightgrey" : "#110f12"
                          }
                        >
                          <ArrowCircleLeftRoundedIcon
                            onClick={() => handleQuantity("Subtract", product)}
                          />
                        </QuantityButton>
                        <Quantity>{product.quantity}</Quantity>
                        <QuantityButton
                          color={
                            product.quantity === 10 ? "lightgrey" : "#110f12"
                          }
                        >
                          <ArrowCircleRightRoundedIcon
                            onClick={() => handleQuantity("Add", product)}
                          />
                        </QuantityButton>
                      </QuantityWrapper>
                    </Center>
                    <Right>
                      <ProductPrice>
                        {formatAmount(product.quantity * product.price)}
                      </ProductPrice>
                    </Right>
                  </Product>
                </Info>
              </Item>
            ))}
          </ProductContainer>
          <Hr height={"2px"} />
          <SummaryContainer>
            <Summary>
              <Subtitle>{t('orderS')}</Subtitle>
              <SummaryItem>
                <SummaryItemText>{t('subt')}</SummaryItemText>
                <SummaryItemPrice>
                  {bag.quantity === 0 ? "--" : formatAmount(bag.total)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>{t('esh')}</SummaryItemText>
                <SummaryItemPrice>
                  {bag.quantity === 0
                    ? "--"
                    : bag.total > 199
                    ? <SummaryItemText>{t('free')}</SummaryItemText>
                    : formatAmount(10)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>{t('dsh')}</SummaryItemText>
                <SummaryItemPrice>
                  {bag.quantity === 0
                    ? "--"
                    : bag.total > 199
                    ? "--"
                    : formatAmount(0)}
                </SummaryItemPrice>
              </SummaryItem>
              <Hr height={"3px"} />
              <SummaryItem font="total">
                <SummaryItemText>{t('total')}</SummaryItemText>
                <SummaryItemPrice>
                  {bag.quantity !== 0 && bag.total < 199
                    ? formatAmount(totalAmount)
                    : bag.quantity === 0
                    ? formatAmount(0)
                    : formatAmount(totalAmount)}
                </SummaryItemPrice>
              </SummaryItem>
            </Summary>
            <CheckOut>
              <StripeCheckout
                name="VIKKILINI"
                image="https://i.ibb.co/LZFSxQ8/VL.png"
                billingAddress
                shippingAddress
                description={`Your total is ${formatAmount(totalAmount)}`}
                amount={totalAmount * 100}
                token={onToken}
                stripeKey={process.env.REACT_APP_KEY}
              >
                <Button>{t('chk')}</Button>
              </StripeCheckout>
            </CheckOut>
            <TextContainer style={{ paddingTop: "20px" }}>
              <Text
                style={{
                  fontSize: "0.8rem",
                  color: "#C0C0C0",
                }}
              >
               {t('plu')}{" "}
                <Copy onClick={() => handleCopy()}>4242 4242 4242 4242</Copy> {t('cvc')}
              </Text>
            </TextContainer>
          </SummaryContainer>
        </BagContainer>
        {showDeleteConfirmation && (
          <DeleteConfirmationModal>
            <ConfirmationBox>
              <ConfirmationText>{t('rmv')}</ConfirmationText>
              <ConfirmationButtons>
                <ConfirmationButton onClick={cancelDelete}>{t('no')}</ConfirmationButton>
                <ConfirmationButton onClick={confirmDelete}>{t('yes')}</ConfirmationButton>
              </ConfirmationButtons>
            </ConfirmationBox>
          </DeleteConfirmationModal>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Bag;