import tw, { styled } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { updateUser } from "../redux/apiCalls";
import { logout } from "../redux/userRedux";

//Pages~~~
import AfterNavBar from "../components/AfterNavBar";
import AfterFooter from "../components/AfterFooter";

//Icons~~~
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const Container = styled.div`
  ${tw`max-w-full w-screen h-screen absolute overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`lg:w-5/6 w-11/12 h-full  mt-10 mx-auto flex flex-col`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Title = styled(motion.h3)`
  ${tw`text-2xl font-bold mb-3`}
`;
const Top = styled.div`
  ${tw`w-full border-b-2 border-black flex flex-col items-center gap-2`}
`;
const Bottom = styled.div`
  ${tw`w-full `}
`;
const Subtitles = styled(motion.div)`
  ${tw``}
`;
const SubTitle = styled.h5`
  ${tw`sm:text-xs text-[9px] text-gray-400 py-1 flex items-center justify-center`}
`;
const Buttons = styled(motion.div)`
  ${tw`w-full my-4 flex items-center justify-between bg-gray-700 text-white hover:bg-white hover:text-black`}
  transition: 1s;
`;
const RightButtons = styled(motion.div)`
  ${tw``}
`;
const Button = styled(motion.button)`
  ${tw`sm:px-4 px-2 py-2 font-semibold sm:text-sm text-xs tracking-wide hover:scale-110 hover:border-2 border-black`}
  transition: 1s;
`;
const Icon = styled(motion.div)`
  ${tw``}
`;

const PaymentPage = () => {
  const { cart } = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;
  const dispatch = useDispatch();

  //[START]=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=//
  useEffect(() => {
    updateUser(dispatch, id, { personalCart: cart });
  }, []);
  //=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=[END]//

  //=*=*=*=*=*=LOGGING-OUT USER=*=*=*=*=*=//
  const handleOut = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <AfterNavBar opacity={"opacity-100"} />
      <Wrapper>
        <Top>
          <Icon
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <CheckCircleOutlinedIcon fontSize="large" className="scale-125" />
          </Icon>
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            Transaction Complete!
          </Title>
        </Top>
        <Bottom>
          <Subtitles
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
          >
            <SubTitle>
              Thank you for your trust and money!{" "}
              <SentimentVerySatisfiedOutlinedIcon fontSize="small" />
            </SubTitle>
            <SubTitle>
              Your parcel will be delivered soon. A little patience won't hurt.
            </SubTitle>
          </Subtitles>
          <Buttons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link to="/">
              <Button
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
              >
                Home
              </Button>
            </Link>
            <RightButtons
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 2 }}
            >
              <Link to="/myOrders">
                <Button>Order History</Button>
              </Link>
              <Button className="hover:!scale-75" onClick={handleOut}>
                Log out
              </Button>
            </RightButtons>
          </Buttons>
        </Bottom>
      </Wrapper>
      <AfterFooter />
    </Container>
  );
};

export default PaymentPage;
