import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Icons~~~
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Container = styled.div`
  ${tw`max-w-full w-screen overflow-x-hidden absolute z-50 bg-white`}
`;
const Wrapper = styled(motion.div)`
  ${tw`mx-auto mt-40 mb-10  lg:w-1/2 w-5/6 flex flex-col items-center gap-1 min-h-full`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Top = styled(motion.div)`
  ${tw`scale-[8] mb-32 text-gray-600`}
`;
const Bottom = styled.div`
  ${tw`font-semibold text-lg uppercase text-gray-700`}
`;
const Home = styled(motion.div)`
  ${tw`mt-12 border-2 border-black px-2 py-1 text-sm font-bold uppercase cursor-pointer hover:bg-black hover:text-white hover:scale-110`}
  transition:1s;
`;
const Message = styled.p`
  ${tw` text-xs font-semibold text-gray-400 text-center`}
`;

const ErrorPage = () => {
  return (
    <Container>
      <Wrapper
        initial={{ y: "-100vw", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Top
          initial={{ scale: 0 }}
          animate={{ scale: 8 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <QuestionMarkIcon />
        </Top>
        <Bottom>
          Page not Found <ThumbDownOffAltIcon className="text-purple-600" />
        </Bottom>
        <Message>
          You are trying to enter an invalid url. Please go home.
        </Message>
        <Link to="/">
          <Home
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Home
          </Home>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default ErrorPage;
