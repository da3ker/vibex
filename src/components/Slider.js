import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import useFetchProduct from "../useFetchProduct";

const Container = styled.div`
  ${tw`w-full flex items-center relative lg:mt-40 mt-20 overflow-hidden z-10`}
`;
const Wrapper = styled.div`
  ${tw`h-full flex `}
`;

const Slide = styled.div`
  ${tw`flex items-center w-screen h-full bg-no-repeat bg-cover`}
  background-image: url(${(props) => props.bg});
  transition: 2s;
`;
const ImgContainer = styled.div`
  ${tw`flex-1 h-full w-1/2 flex justify-center`}
`;
const InfoContainer = styled.div`
  ${tw`flex-1 flex z-10`}
`;

const Info = styled(motion.div)`
  ${tw`lg:w-5/6 lg:ml-72 ml-auto scale-50 lg:scale-100 `}
`;
const Image = styled.img`
  ${tw`lg:h-full h-5/6 absolute bottom-0`}
`;

const SubTitle = styled.h4`
  ${tw`lg:text-2xl text-base tracking-wider`}
`;

const Title = styled.h1`
  ${tw`lg:text-7xl text-2xl font-black`}
`;

const ColoredButtons = styled.div`
  ${tw`rounded-full w-4 h-4 cursor-pointer hover:scale-110`}
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
`;
const ButtonContainer = styled.div`
  ${tw`flex gap-3`}
`;

const ShopNow = styled.button`
  ${tw`lg:w-80 lg:text-4xl w-48 text-2xl h-16 rounded-full bg-red-200 mt-4  tracking-wider font-black text-white hover:bg-red-400`}
  transition: 1s;
`;

const RadioBtn = styled.input`
  ${tw`hidden`}
`;

const RadNav = styled.div`
  ${tw`absolute w-full flex justify-center items-center gap-3 bottom-0 text-center pb-3`}
`;
const RadBtn = styled.label`
  ${tw`border-2 border-white lg:p-1.5 p-1 rounded-lg cursor-pointer hover:bg-white`}
  transition: 1s;
`;

const Slider = () => {
  //=*=*=*=*=*=SLIDER ANIMATION=*=*=*=*=*=//
  useEffect(() => {
    let counter = 1;
    const timer = setInterval(function () {
      document.getElementById("r" + counter).checked = true;
      counter++;
      if (counter > 2) {
        counter = 1;
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  //=*=*=*=*=*=USEFETCH (FETCHING PRODUCTS)=*=*=*=*=*=//
  const { products } = useFetchProduct("featured");

  return (
    <Container className="h-1/3 lg:h-[calc(100vh_-_10rem)]">
      <Wrapper>
        <RadioBtn type="radio" name="radio-btn" id="r1" />
        <RadioBtn type="radio" name="radio-btn" id="r2" />
        {products.slice(0, 2).map((item) => (
          <Slide bg={item.imgBg} className="slider" key={item._id}>
            <InfoContainer>
              <Info
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <SubTitle>{item.subName}</SubTitle>
                <Title>{item.name.toUpperCase()}</Title>
                <ButtonContainer>
                  <ColoredButtons color="yellow" />
                  <ColoredButtons color="black" />
                  <ColoredButtons color="white" />
                </ButtonContainer>
                <Link to="/products/featured">
                  <ShopNow>SHOP NOW</ShopNow>
                </Link>
              </Info>
            </InfoContainer>
            <ImgContainer>
              <Image src={item.img} alt={item.desc} />
            </ImgContainer>
          </Slide>
        ))}
        <RadNav className="radNav">
          <RadBtn className="radBtn1"></RadBtn>
          <RadBtn className="radBtn2"></RadBtn>
        </RadNav>
        <RadNav>
          <RadBtn htmlFor="r1"></RadBtn>
          <RadBtn htmlFor="r2"></RadBtn>
        </RadNav>
      </Wrapper>
    </Container>
  );
};

export default Slider;
