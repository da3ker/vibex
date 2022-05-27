import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { updateUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

//Components~~~
import AfterFooter from "../components/AfterFooter";
import ProfileSideBar from "../components/ProfileSideBar";
import Wishes from "../components/Wishes";

//ICONS~~~
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

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
  ${tw`sm:w-1/2 w-full uppercase`}
`;
const Title = styled.h2`
  ${tw`sm:text-4xl text-3xl sm:mb-10 mb-5 font-bold w-96 `}
`;

const Right = styled(motion.div)`
  ${tw` `}
`;

const WishListPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = currentUser._id;

  //=*=*=*=*=*=UPDATING USER'S WISHLIST=*=*=*=*=*=//
  useEffect(() => {
    updateUser(dispatch, id, { wishlist: wishlist.products });
  }, [dispatch, id, wishlist.products]);
  return (
    <Container>
      <Wrapper>
        <Left
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {wishlist.products.length > 0 ? (
            <Title>Wish List</Title>
          ) : (
            <Title className="!text-2xl !normal-case">
              Your Wish list is empty
              <SentimentDissatisfiedIcon />
            </Title>
          )}
          <Wishes />
        </Left>
        <Right>
          <ProfileSideBar />
        </Right>
      </Wrapper>
      <AfterFooter />
    </Container>
  );
};

export default WishListPage;
