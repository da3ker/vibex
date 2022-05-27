import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import { removeWish } from "../redux/wishlistRedux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { publicRequest } from "../requestMethod";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled(motion.div)`
  ${tw`flex flex-col mb-10 p-4 uppercase rounded-lg gap-4`}
  box-shadow: rgba(0, 0, 0, 0.3) 5px 5px, rgba(0, 0, 0, 0.2) 10px 10px, rgba(0, 0, 0, 0.1) 15px 15px;
`;
const Top = styled.div`
  ${tw`flex gap-2`}
`;

const Left = styled.div`
  ${tw`relative overflow-hidden`}
`;
const ProductImg = styled.img`
  ${tw`object-cover rounded-lg min-w-[218px]`}
`;
const Mid = styled.div`
  ${tw`flex bg-transparent flex-col lg:gap-2 gap-1 text-gray-700`}
`;

const Info = styled.h2`
  ${tw`lg:text-3xl text-xl font-semibold `}
`;
const InfoWrapper = styled.div`
  ${tw`flex flex-col gap-2 mb-2`}
`;
const Label = styled.h4`
  ${tw`font-medium lg:text-sm text-xs`}
`;

const Right = styled.div`
  ${tw`flex justify-between items-end`}
`;
const Remove = styled.button`
  ${tw`flex items-center text-sm font-semibold px-2 border-2 border-white text-gray-300 hover:text-gray-800 hover:border-gray-700 hover:scale-105`}
  transition:1s;
`;
const Add = styled.button`
  ${tw`text-xs tracking-wider font-bold px-2 py-1 border-2 border-gray-800 bg-gray-800 text-white hover:bg-white hover:text-black hover:scale-105`}
  transition:1s;
`;

const Color = styled.div`
  ${tw`rounded-full w-7 h-7 border-2 border-gray-600`}
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
`;
const Size = styled.div`
  ${tw`lg:text-lg text-base font-semibold lg:w-8 w-6 lg:h-8 h-6 border-2 border-gray-600 flex items-center justify-center`}
`;
const Colors = styled.div`
  ${tw`flex gap-2`}
`;
const Sizes = styled.div`
  ${tw`flex gap-2`}
`;
const Price = styled.h4`
  ${tw`font-semibold text-red-600 tracking-wider lg:text-base text-sm`}
`;

const Wish = ({ item, index }) => {
  const [isRemove, setIsRemove] = useState(false);
  const dispatch = useDispatch();
  const wish = -1;

  //[START]=*=*=*=*=*=DECREMENTING PRODUCT WISHED=*=*=*=*=*=//
  const updateWished = async (id, wish) => {
    try {
      const res = await publicRequest.put("/products/updateWished/" + id, wish);
    } catch (err) {
      console.log(err);
    }
  };
  //[START]=*=*=*=*=*=DECREMENTING PRODUCT WISHED=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=REMOVING WISHED PRODUCT TO USER'S WISHLIST=*=*=*=*=*=//
  const handleRemove = () => {
    setTimeout(function () {
      dispatch(removeWish({ item, index }));
      updateWished(item._id, { wish });
    }, 1000);
  };
  //=*=*=*=*=*=REMOVING WISHED PRODUCT TO USER'S WISHLIST=*=*=*=*=*=[END]//

  //=*=*=*=*=*=ANIMATION VARIANTS=*=*=*=*=*=//
  const variants = {
    open: { x: 0 },
    closed: { x: "-150vh" },
  };

  return (
    <Container
      animate={isRemove ? "closed" : "open"}
      transition={{ duration: 1 }}
      variants={variants}
      initial={"open"}
    >
      <Top>
        <Left>
          <ProductImg src={item.img} />
        </Left>
        <Mid>
          <Info>{item.name}</Info>
          <InfoWrapper>
            <Label>Available Colors:</Label>
            <Colors>
              {item.colors.map((c) => (
                <Color color={c} key={c} />
              ))}
            </Colors>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Available Sizes:</Label>
            <Sizes>
              {item.sizes.map((s) => (
                <Size key={s}>{s}</Size>
              ))}
            </Sizes>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Available Stocks:</Label>
            {item.inStock}
          </InfoWrapper>
          <InfoWrapper>
            <Label>Price:</Label>
            <Price>${item.price}.00</Price>
          </InfoWrapper>
        </Mid>
      </Top>
      <Right>
        <Link to={`/product/${item._id}`}>
          <Add>View Product</Add>
        </Link>
        <Remove
          onClick={() => {
            handleRemove();
            setIsRemove(true);
          }}
        >
          Remove
          <CloseIcon />
        </Remove>
      </Right>
    </Container>
  );
};

export default Wish;
