import newDesign from "../banner-images/new-design.png";
import freeShipping from "../banner-images/free-shipping.png";
import tw, { styled } from "twin.macro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/cartRedux";
import { updateWish } from "../redux/wishlistRedux";

//Components~~~
import Slider from "../components/Slider";
import Featured from "../components/Featured";
import Deals from "../components/Deals";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  ${tw`max-w-full w-screen`}
`;

const Banner = styled.img`
  ${tw`w-full mt-0.5 lg:opacity-100 opacity-50`}
`;

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  //[START]=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=//
  useEffect(() => {
    if (currentUser?.personalCart.quantity > 0) {
      dispatch(
        updateCart({
          products: currentUser?.personalCart.products,
          quantity: currentUser?.personalCart.quantity,
          total: currentUser?.personalCart.total,
        })
      );
    }
  }, [
    currentUser?.personalCart.products,
    currentUser?.personalCart.quantity,
    currentUser?.personalCart.total,
    dispatch,
  ]);
  //=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING USER'S WISHLIST=*=*=*=*=*=//
  useEffect(() => {
    if (currentUser?.wishlist.length > 0) {
      dispatch(updateWish(currentUser?.wishlist));
    }
  }, [currentUser?.wishlist, dispatch]);
  //=*=*=*=*=*=UPDATING USER'S WISHLIST=*=*=*=*=*=[START]//

  return (
    <Container>
      <Deals />
      {location.pathname === "/" && <Slider />}
      <Banner src={freeShipping} alt="Free Shipping" />
      <Featured />
      <Banner src={newDesign} alt="New Design" />
    </Container>
  );
};

export default Home;
