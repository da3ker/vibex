import { useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import Wish from "./Wish";

const Container = styled.div`
  ${tw`w-full`}
`;

const Wishes = () => {
  //=*=*=*=*=*=FETCHING USER'S WISHLIST=*=*=*=*=*=//
  const { products } = useSelector((state) => state.wishlist);
  return (
    <Container>
      {products?.map((item, index) => (
        <Wish item={item} key={item._id + Math.random()} index={index++} />
      ))}
    </Container>
  );
};

export default Wishes;
