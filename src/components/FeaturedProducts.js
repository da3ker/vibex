import tw, { styled } from "twin.macro";

//COMPONENTS~~~
import FeaturedProduct from "./FeaturedProduct";

const Container = styled.div`
  ${tw`py-8 flex justify-center w-5/6 mx-auto flex-wrap gap-x-10 lg:gap-y-16 gap-y-9  `}
  margin-top:-2rem;
`;

const FeaturedProducts = ({ featuredProducts }) => {
  return (
    <Container>
      {featuredProducts.slice(0, 4).map((item) => (
        <FeaturedProduct item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default FeaturedProducts;
