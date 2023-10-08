import { getOrders } from "../redux/authRedux";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  margin: auto;
  max-width: 800px;
  width: 90%;
`;

const MainContainer = styled.div`
  max-height: 500px;
  overflow: scroll;
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 800px;
`;
const Head = styled.div`
  width: 100%;
  display: flex;
`;
const Text = styled.p`
  display: flex;
  flex: 1;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  ${mobile({ fontSize: "0.8rem" })}
`;
const Row = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px 0;
  &:hover {
    background-color: #f8f8f8;
  }
`;
const Hr = styled.hr`
  background-color: #eee;
  margin: 10px 0;
  border: none;
  height: 2px;
  ${mobile({ margin: "10px 0" })}
`;
const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.currentUser._id);
  useEffect(() => {
    getOrders(userID, dispatch);
  }, [userID, dispatch]);
  const order = useSelector((state) => state.order.orders);
  const {t} = useTranslation();
  return (
    <Container>
      <Head>
        <Text>{t('orderN')}</Text>
        <Text>{t('date')}</Text>
        <Text>{t('amount')}</Text>
        <Text>{t('status')}</Text>
      </Head>
      <Hr height={"2px"} />
      <MainContainer>
        <Wrapper>
          {order?.length === 0 && (
            <Text style={{ marginTop: "30px" }}>
              {t('Yda')}
            </Text>
          )}
          {order?.map((order) => (
            <Row
              key={order._id}
              onClick={() => {
                navigate(`/order/${order._id}`);
              }}
            >
              <Text>#{order._id.substring(0, 8)}</Text>
              <Text>{formatDate(order.createdAt)}</Text>
              <Text>{formatAmount(order.amount-250)}</Text>
              <Text>{order.status}</Text>
            </Row>
          ))}
        </Wrapper>
      </MainContainer>
    </Container>
  );
};

export default OrderHistory;