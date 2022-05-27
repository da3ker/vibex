import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import useFetchProduct from "../useFetchProduct";

//COMPONENTS~~~
import FeaturedProducts from "./FeaturedProducts";
import Loading from "./Loading";

const Container = styled.div`
  ${tw`w-full my-6 h-auto`}
`;
const Title = styled.div`
  ${tw`w-full h-20 text-center text-gray-500`}
`;

const ButtonContainer = styled.div`
  ${tw`flex justify-center items-center mt-10`}
`;
const ViewAll = styled.div`
  ${tw`border-2 border-gray-500 text-gray-500 lg:text-base text-xs px-4 py-2 font-medium hover:bg-gray-400 hover:text-white`}
  transition: 1s;
`;

const Featured = () => {
  //=*=*=*=*=*=USEFETCH (FETCHING PRODUCTS)=*=*=*=*=*=//
  const { products } = useFetchProduct("vibex22");

  return (
    <Container>
      <Title>
        <h6 className="lg:text-base text-lg">MOST POPULAR</h6>
        <h2 className="lg:text-4xl text-3xl font-bold tracking-widest">
          VIBEX22
        </h2>
      </Title>
      <FeaturedProducts featuredProducts={products} />
      <ButtonContainer>
        <Link to="/products/vibex22">
          <ViewAll>VIEW ALL</ViewAll>
        </Link>
      </ButtonContainer>
      {products.length < 1 && <Loading />}
    </Container>
  );
};

export default Featured;
