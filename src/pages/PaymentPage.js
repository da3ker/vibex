import tw, { styled } from "twin.macro";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

//Pages~~~
import AfterNavBar from "../components/AfterNavBar";
import AfterFooter from "../components/AfterFooter";
import Paypal from "../components/Paypal";
import ProductSummary from "../components/ProductSummary";

const Container = styled.div`
  ${tw`max-w-full w-screen h-screen absolute overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`lg:w-5/6 w-11/12 mt-10 mx-auto flex sm:flex-row flex-col justify-between min-h-full`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Left = styled.div`
  ${tw`sm:w-3/5 w-full`}
`;
const Top = styled.div`
  ${tw`w-full border-b-2 border-black`}
`;
const Title = styled.h3`
  ${tw`sm:text-3xl text-xl font-bold mb-3`}
`;
const SubTitle = styled.h5`
  ${tw`text-sm mb-3`}
`;
const CardSection = styled.div`
  ${tw`w-full mt-2 flex gap-1 border-b-[1px] border-gray-400`}
`;
const RadioButton = styled.input`
  ${tw`w-5 h-5 bg-black`}
`;
const LabelTitle = styled.label`
  ${tw`text-lg font-bold `}
`;
const PaymentSection = styled.div`
  ${tw`mt-4 hidden`}
`;

const Right = styled.div`
  ${tw`sm:w-1/3 w-full`}
`;
const Summary = styled.div`
  ${tw`lg:p-4 p-2`}
  border: 1px solid #DEDEDE;
`;
const OrderSummary = styled.div`
  ${tw`lg:text-xl text-lg lg:font-semibold font-bold lg:mb-4 mb-2`}
`;
const Section = styled.div`
  ${tw`flex items-center justify-between my-2 lg:text-base text-sm`}
`;
const TotalText = styled.h3`
  ${tw`lg:text-2xl text-lg font-medium`}
`;
const TotalAmount = styled.h3`
  ${tw`lg:text-xl text-base font-medium`}
`;
const SLeft = styled.div`
  ${tw`font-medium`}
`;
const SRight = styled.div`
  ${tw``}
`;
const Orders = styled(motion.div)`
  ${tw`mt-4`}
`;
const ShowOrHide = styled.span`
  ${tw`cursor-pointer text-sm font-medium hover:font-semibold hidden`}
`;
const Error = styled.div`
  ${tw`font-semibold text-red-400 text-xs tracking-wider`}
`;

const PaymentPage = () => {
  const { cart } = useSelector((state) => state);
  const [selectedPayment, setSelectedPayment] = useState();
  const [toShow, setToShow] = useState(4);
  const [error, setError] = useState(false);

  //=*=*=*=*=*=TOGGLE PAYMENT SELECTION=*=*=*=*=*=//
  const toggle = (index) => {
    setSelectedPayment(index);
  };

  return (
    <Container>
      <AfterNavBar opacity={"opacity-50"} />
      <Wrapper>
        <Left>
          <Top>
            <Title>PAYMENT METHOD</Title>
            <SubTitle>All transactions are safe and secure</SubTitle>
          </Top>
          <form>
            <CardSection>
              <RadioButton
                type="radio"
                id="radio-2"
                name="payment"
                value="paypal"
                onClick={() => toggle(1)}
              />
              <LabelTitle htmlFor="radio-2">PAYPAL</LabelTitle>
            </CardSection>
          </form>
          {error && (
            <Error>
              [Error] Kindly check your paypal or card balance and try again...
            </Error>
          )}
          <PaymentSection className={selectedPayment === 1 && "!block"}>
            <Paypal setError={setError} />
          </PaymentSection>
        </Left>
        <Right>
          <Summary>
            <OrderSummary className="font-bold">ORDER SUMMARY</OrderSummary>
            <Section>
              <SLeft>{cart.quantity} ITEM(S)</SLeft>
              <SRight>$ {cart.total}.00</SRight>
            </Section>
            <Section>
              <SLeft>DELIVERY</SLeft>
              <SRight>FREE</SRight>
            </Section>
            <Section>
              <TotalText>TOTAL</TotalText>
              <TotalAmount type="total">$ {cart.total}.00</TotalAmount>
            </Section>
          </Summary>
          <Orders
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {cart.products
              .map((item) => (
                <ProductSummary
                  name={item.name.toUpperCase()}
                  color={item.color}
                  size={item.size}
                  image={item.img}
                  quantity={item.quantity}
                  key={item._id + Math.random()}
                />
              ))
              .slice(0, toShow)}
            {cart.quantity > 4 && (
              <ShowOrHide
                onClick={() => setToShow(cart.quantity)}
                className={toShow !== cart.quantity && "!block"}
              >
                See more...
              </ShowOrHide>
            )}
            <ShowOrHide
              onClick={() => setToShow(4)}
              className={toShow > 4 && "!block"}
            >
              See less...
            </ShowOrHide>
          </Orders>
        </Right>
      </Wrapper>
      <AfterFooter />
    </Container>
  );
};

export default PaymentPage;
