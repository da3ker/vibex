import tw, { styled } from "twin.macro";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Magnifier from "react-magnifier";
import newDesign from "../banner-images/new-design.png";

//Icons~~~
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Container = styled.div`
  ${tw`max-w-full w-screen overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`xl:w-2/3 lg:w-11/12 w-5/6  mx-auto lg:mt-32 mt-24 mb-10  flex lg:flex-row flex-col gap-1`}
`;
const Angles = styled.div`
  ${tw`flex lg:flex-col flex-row justify-between flex-none`}
`;
const View = styled.div`
  ${tw`xl:w-40 xl:h-40 lg:w-36 lg:h-36 w-24 h-24 bg-gray-200 lg:text-lg text-sm font-semibold text-white flex justify-center items-center rounded-sm cursor-pointer`}
`;
const ImgContainer = styled(motion.div)`
  ${tw`flex-1 flex justify-center items-center`}
`;
const MagnifierImg = styled(motion.div)`
  ${tw`xl:block hidden `}
`;
const ProxyImg = styled.img`
  ${tw`xl:hidden block w-full h-full object-contain`}
`;
const InfoContainer = styled.div`
  ${tw` h-full lg:py-4 py-1 flex-1`}
`;
const BrandName = styled.h2`
  ${tw`xl:text-2xl lg:text-xl text-lg font-bold uppercase`}
`;
const Review = styled.span`
  ${tw`text-xs`}
`;
const Price = styled.div`
  ${tw`flex items-center gap-1 my-2 `}
`;
const Old = styled.s`
  ${tw`font-normal text-black`}
`;
const New = styled.p`
  ${tw`font-semibold text-sm`}
  ${({ color }) => color === "black" && tw`text-black`};
  ${({ color }) => color === "red" && tw`text-red-600`};
`;
const Color = styled.div`
  ${tw`xl:my-4 my-2 `}
`;
const Title = styled.h3`
  ${tw`text-base font-bold xl:mb-4 mb-1`}
`;
const BoxWrapper = styled.div`
  ${tw`flex `}
`;
const ColorBox = styled.div`
  ${tw`xl:w-10 xl:h-10 w-6 h-6 xl:mr-6 mr-3 cursor-pointer hover:opacity-80`}
  border: 1px solid black;
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
`;
const Sizes = styled.div`
  ${tw`xl:my-4 my-2 uppercase`}
`;
const SizeWrapper = styled.div`
  ${tw`flex`}
`;
const Size = styled.div`
  ${tw`xl:w-14 xl:h-10 w-12 h-8 text-base font-medium flex justify-center items-center mr-2 border-black border-2 cursor-pointer hover:bg-gray-700 hover:text-white`}
`;
const QuantityContainer = styled.div`
  ${tw`xl:my-4 my-2`}
`;
const Quantity = styled.div`
  ${tw`w-20 h-10 flex justify-between items-center font-medium `}
  border: 1px solid black;
`;
const Amount = styled.div`
  ${tw`font-bold`}
`;
const Quality = styled.p`
  ${tw`text-sm font-medium xl:my-4 my-2`}
`;
const Availability = styled.p`
  ${tw`text-xs font-medium lg:my-4 my-2`}
`;
const ADD = styled.div`
  ${tw`xl:w-96 lg:w-60 w-52 xl:h-16 h-14 relative flex justify-center items-center rounded bg-black text-white lg:text-3xl text-xl font-semibold cursor-pointer`}
`;
const Note = styled.p`
  ${tw`text-[8px] leading-4 font-light text-white absolute bottom-0`}
`;
const Banner = styled.img`
  ${tw`w-full mt-0.5 lg:opacity-100 opacity-50`}
`;

const SelectedProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  //[START]=*=*=*=*=*=FETCHING PRODUCT DATA=*=*=*=*=*=//
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  //=*=*=*=*=*=FETCHING PRODUCT DATA=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=INCREMENTING OR DECREMENTING PRODUCT QUANTITY=*=*=*=*=*=//
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  //=*=*=*=*=*=INCREMENTING OR DECREMENTING PRODUCT QUANTITY=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDING TO USER'S CART=*=*=*=*=*=//
  const handleClick = () => {
    notifyCart();
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  //=*=*=*=*=*=ADDING TO USER'S CART=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDED CART NOTIFICATION=*=*=*=*=*=//
  const notifyCart = () =>
    toast.info("Added to Cart", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: false,
      className: "toast-info-container toast-info-container-after",
    });
  //=*=*=*=*=*=ADDED CART NOTIFICATION=*=*=*=*=*=[END]//

  return (
    <Container>
      <Wrapper className="h-auto ">
        <Angles>
          <View>Front View</View>
          <View>Side View</View>
          <View>Back View</View>
        </Angles>
        <ImgContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        >
          <MagnifierImg>
            <Magnifier
              src={product.img}
              width={390}
              height={580}
              mgShape="square"
              zoomFactor="1.8"
            />
          </MagnifierImg>
          <ProxyImg src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <BrandName>{product.name}</BrandName>
          <Review>{product.sold} sold</Review>
          <Price>
            {product.oldprice && <Old>$ {product.oldprice}.00 </Old>}
            <New color={!product.oldprice ? "black" : "red"}>
              $ {product.price}.00
            </New>
          </Price>
          <hr className="w-80" />
          <Color>
            <Title>COLOR</Title>
            <BoxWrapper>
              {product.colors?.map((c) => (
                <ColorBox
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                  className={
                    c === color &&
                    "!border-2 !border-sky-300 !rounded !opacity-60"
                  }
                />
              ))}
            </BoxWrapper>
          </Color>
          <Sizes>
            <Title>SIZE</Title>
            <SizeWrapper>
              {product.sizes?.map((s) => (
                <Size
                  key={s}
                  onClick={() => setSize(s)}
                  className={s === size && "!bg-black !text-white"}
                >
                  {s}
                </Size>
              ))}
            </SizeWrapper>
          </Sizes>
          <QuantityContainer>
            <Title>QUANTITY</Title>
            <Quantity>
              <RemoveIcon
                onClick={() => handleQuantity("dec")}
                fontSize="small"
                className="cursor-pointer"
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                onClick={() => handleQuantity("inc")}
                fontSize="small"
                className="cursor-pointer"
              />
            </Quantity>
          </QuantityContainer>
          <Quality>Premium Quality</Quality>
          <Availability>
            <RadioButtonCheckedIcon
              fontSize="small"
              className={product.inStock ? "text-green-400" : "text-red-400"}
            />
            {product.inStock ? "In Stock, Ready to Ship" : "Out of Stock"}
          </Availability>
          {color === "" || size === "" ? (
            <ADD className="!cursor-not-allowed hover:!bg-gray-900 opacity-70">
              Add to cart
              <Note>Please choose a color and the size first</Note>
            </ADD>
          ) : (
            <ADD
              onClick={handleClick}
              className="active:!bg-sky-300 active:!text-lg"
              style={{ transition: "0.1s" }}
            >
              Add to cart
            </ADD>
          )}
        </InfoContainer>
      </Wrapper>
      <Banner src={newDesign} alt="New Design" />
    </Container>
  );
};

export default SelectedProduct;
