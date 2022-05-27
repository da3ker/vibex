import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

//Components~~~
import AfterFooter from "../components/AfterFooter";
import Orders from "../components/Orders";
import ProfileSideBar from "../components/ProfileSideBar";

const Container = styled.div`
  ${tw`max-w-full w-screen h-screen absolute `}
`;
const Wrapper = styled.div`
  ${tw`mx-auto sm:mt-40 mt-32 mb-10 w-4/5 flex sm:flex-row flex-col min-h-full overflow-x-hidden`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Left = styled(motion.div)`
  ${tw`sm:w-3/5 w-full uppercase`}
`;
const Title = styled.h2`
  ${tw`sm:text-4xl text-3xl sm:mb-10 mb-5 font-bold w-96 `}
`;
const Right = styled(motion.div)`
  ${tw``}
`;

const OrdersPage = () => {
  return (
    <Container>
      <Wrapper>
        <Left
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Title>MY ORDERS</Title>
          <Orders />
        </Left>
        <Right>
          <ProfileSideBar />
        </Right>
      </Wrapper>
      <AfterFooter />
    </Container>
  );
};

export default OrdersPage;
