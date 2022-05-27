import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import { userRequest } from "../requestMethod";
import Order from "./Order";

const Container = styled.div`
  ${tw`w-full`}
`;

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState();
  const id = currentUser._id;

  //=*=*=*=*=*=FETCHING USER'S ORDERS=*=*=*=*=*=//
  useEffect(() => {
    const getOrders = async (userId) => {
      try {
        const res = await userRequest.get("/orders/find/" + userId);
        setOrderData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders(id);
  }, [id]);

  return (
    <Container>
      {orderData
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((item) => (
          <Order item={item} key={item._id} />
        ))}
    </Container>
  );
};

export default Orders;
