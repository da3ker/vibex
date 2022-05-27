import tw, { styled } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { updateUser } from "../redux/apiCalls";
import { reset } from "../redux/userRedux";

//Components~~~
import AddedProduct from "../components/AddedProduct";

//Icons~~~
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Container = styled.div`
  ${tw`max-w-full w-screen`}
`;
const Wrapper = styled.div`
  ${tw`xl:w-4/5 w-11/12 mx-auto lg:mt-36 mt-24 mb-10 flex flex-col items-start`}
`;
const Title = styled.h2`
  ${tw`lg:text-4xl text-2xl lg:font-bold font-extrabold  w-full my-2`}
`;
//Top Wrapper---Start
const TopWrapper = styled(motion.div)`
  ${tw`h-12 w-full flex items-center justify-between`}
`;
const Total = styled.span`
  ${tw`lg:text-lg text-xs flex lg:flex-row flex-col gap-x-2`}
`;
const Amount = styled.p`
  ${tw`lg:text-lg text-sm font-semibold`}
`;
const CheckOut = styled.div`
  ${tw`lg:h-12 h-10 lg:w-96 w-36 text-white flex items-center justify-between px-4 font-bold text-sm tracking-wider cursor-pointer hover:text-gray-400 bg-black`}
`;
//Top Wrapper---End

//Bottom Wrapper---Start
const BottomWrapper = styled.div`
  ${tw`w-full mt-8 flex lg:flex-row flex-col lg:gap-20 gap-2`}
`;
const ProductList = styled(motion.div)`
  ${tw`flex-1`}
`;

const Order = styled(motion.div)`
  ${tw`flex-none lg:w-96 w-72`}
`;
// Order Summary--Start
const Summary = styled.div`
  ${tw`lg:p-4 p-2`}
  border: 1px solid #DEDEDE;
`;
const SubTitle = styled.h2`
  ${tw`lg:text-xl text-lg lg:font-bold font-extrabold lg:mb-4 mb-2`}
`;
const Section = styled.div`
  ${tw`flex items-center justify-between my-2 lg:text-base text-sm`}
`;
const Left = styled.div`
  ${tw`font-medium`}
`;
const Right = styled.div`
  ${tw``}
`;
const TotalText = styled.h3`
  ${tw`lg:text-2xl text-xl font-medium`}
`;
const TotalAmount = styled.h3`
  ${tw`lg:text-xl text-lg font-medium`}
`;
// Order Summary--End

const PromoWrapper = styled.div`
  ${tw`flex flex-col lg:gap-5 gap-2  mt-4`}
`;
const Promo = styled.div`
  ${tw`h-14 flex justify-between items-center`}
  border: 1px solid black;
`;
const PromoCode = styled.input`
  ${tw`flex-1 h-full text-base outline-none px-4 bg-transparent`}
`;
const Apply = styled.div`
  //Should be Hidden by defaut
  ${tw`h-12 w-full text-white flex items-center justify-between px-4 font-bold text-sm tracking-wider cursor-pointer hover:text-gray-400 bg-black`}
`;
const PaymentMethods = styled.div`
  ${tw`flex-none w-full text-xs font-semibold tracking-widest lg:mt-8 mt-4`}
`;
const CardsImg = styled.img`
  ${tw`pt-2`}
`;
//Bottom Wrapper---End
const Continue = styled.div`
  ${tw`mt-2 lg:h-12 h-10 lg:w-60 w-52 text-white flex items-center justify-between lg:px-4 px-2 font-bold lg:text-sm text-xs  tracking-wider cursor-pointer hover:text-gray-700 text-black`}
  border: 2px solid #808080;
`;

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = currentUser?._id;

  //[START]=*=*=*=*=*=FORCE REFRESH IF ERROR EXIST=*=*=*=*=*=//
  useEffect(() => {
    if (error) {
      dispatch(reset());
      window.location.reload(false);
    }
  }, [error, dispatch]);
  //=*=*=*=*=*=FORCE REFRESH IF ERROR EXIST=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=//!don't include currentUser as dependency!
  useEffect(() => {
    if (currentUser) {
      updateUser(dispatch, id, { personalCart: cart });
    }
  }, [dispatch, id, cart]);
  //=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=[END]//

  return (
    <Container className={!cart.quantity && "!h-screen"}>
      {cart.quantity ? (
        <Wrapper>
          <Title>YOUR BAG</Title>
          <TopWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Total>
              TOTAL ({cart.quantity} {cart.quantity > 1 ? "items" : "item"})
              <Amount type="total">$ {cart.total}.00</Amount>
            </Total>
            <Link to="/shipping">
              <CheckOut>
                CHECKOUT
                <ArrowRightAltIcon fontSize="large" />
              </CheckOut>
            </Link>
          </TopWrapper>
          <BottomWrapper>
            <ProductList
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              {cart.products.map((product, index) => (
                <AddedProduct
                  product={product}
                  key={product._id + Math.random()}
                  index={index++}
                />
              ))}
            </ProductList>
            <Order
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Summary>
                <SubTitle>ORDER SUMMARY</SubTitle>
                <Section>
                  <Left>{cart.quantity} ITEM(S)</Left>
                  <Right>$ {cart.total}.00</Right>
                </Section>
                <Section>
                  <Left>DELIVERY</Left>
                  <Right>FREE</Right>
                </Section>
                <Section>
                  <TotalText>TOTAL</TotalText>
                  <TotalAmount type="total">$ {cart.total}.00</TotalAmount>
                </Section>
              </Summary>
              <PromoWrapper>
                <Promo>
                  <PromoCode
                    id="promo"
                    type="text"
                    placeholder="Enter your promo code"
                  />
                  <AddIcon fontSize="large" />
                </Promo>
                <Apply>
                  APPLY
                  <ArrowRightAltIcon fontSize="large" />
                </Apply>
              </PromoWrapper>
              <PaymentMethods>
                ACCEPTED PAYMENT METHODS
                <CardsImg src={require("../sampleCards.png")} />
              </PaymentMethods>
            </Order>
          </BottomWrapper>
          <Link
            to={`/products/${
              cart.products[cart.products.length - 1].categories[0]
            }`}
          >
            <Continue>
              CONTINUE SHOPPING
              <AddShoppingCartIcon />
            </Continue>
          </Link>
        </Wrapper>
      ) : (
        <Wrapper className="!h-full">
          <Title className="!text-xl">
            Your Bag is Empty <SentimentVeryDissatisfiedIcon />
          </Title>
          <SubTitle className="!text-sm !font-light">
            Once you add something to your bag - it will appear here. Ready to
            shop?
          </SubTitle>
          <Link to="/products/hot-deals">
            <Continue
              className="hover:!bg-black hover:!text-white"
              style={{ transition: "1s" }}
            >
              SHOP NOW! <ShoppingCartIcon />
            </Continue>
          </Link>
        </Wrapper>
      )}
    </Container>
  );
};

export default Cart;
