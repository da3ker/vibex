import tw, { styled } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, quantityDec, quantityInc } from "../redux/cartRedux";
import { useEffect, useState } from "react";
import { addWish } from "../redux/wishlistRedux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { publicRequest } from "../requestMethod";

//ICONS~~~
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Container = styled(motion.div)`
  ${tw`lg:h-72 h-48 flex mb-10`}
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const ProductImage = styled.img`
  ${tw`h-full`}
`;
const ProductInfo = styled.div`
  ${tw`flex-1 flex flex-col justify-between xl:py-4 py-2 xl:px-8 px-2`}
`;
const Desc = styled.div`
  ${tw`flex flex-col gap-2 `}
`;
const BrandName = styled.p`
  ${tw`lg:text-lg text-xs font-medium uppercase`}
`;
const Color = styled.div`
  ${tw`rounded-full w-4 h-4 border-[1px] border-gray-400`}
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
`;
const Size = styled.div`
  ${tw`lg:h-8 h-6 lg:w-12 w-10 border-2 border-black lg:text-base text-sm text-center uppercase`}
`;
const Quantity = styled.div`
  ${tw`lg:w-20 w-16 lg:h-10 h-8 flex justify-between items-center font-medium `}
  border: 1px solid black;
`;
const Amount = styled.div`
  ${tw`font-bold`}
`;
const Price = styled.p`
  ${tw`lg:text-xl text-xs lg:font-light font-semibold flex xl:items-start items-end xl:py-4 py-2 xl:pl-8 pl-0`}
`;
const SideBar = styled.div`
  ${tw`flex flex-col xl:py-4 py-2 xl:px-4 px-px gap-2`}
`;
const WishIcon = styled.div`
  ${tw`cursor-pointer hover:scale-110`}
  transition:1s;
`;

const AddedProduct = ({ product, index }) => {
  const quantity = product.quantity;
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { products } = useSelector((state) => state.wishlist);
  const [isRemove, setIsRemove] = useState(false);
  const wish = 1;

  //[START]=*=*=*=*=*=INCREMENTING PRODUCT WISHED=*=*=*=*=*=//
  const updateWished = async (id, wish) => {
    try {
      const res = await publicRequest.put("/products/updateWished/" + id, wish);
    } catch (err) {
      console.log(err);
    }
  };
  //=*=*=*=*=*=INCREMENTING PRODUCT WISHED=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=INCREMENTING OR DECREMENTING PRODUCT QUANTITY=*=*=*=*=*=//
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && dispatch(quantityDec({ index, quantity }));
    } else {
      dispatch(quantityInc({ index, quantity }));
    }
  };
  //=*=*=*=*=*=INCREMENTING OR DECREMENTING PRODUCT QUANTITY=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=REMOVING PRODUCT=*=*=*=*=*=//
  const handleClose = () => {
    setTimeout(function () {
      dispatch(removeProduct({ index, ...product }));
    }, 1000);
  };
  //=*=*=*=*=*=REMOVING PRODUCT=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=//
  useEffect(() => {
    let wished = products.find((i) => i._id === product._id);
    if (wished) {
      setLiked(true);
    }
  }, [product._id, products]);
  //=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDING TO USER'S WISHLIST=*=*=*=*=*=//
  const handleAddToWishList = () => {
    if (!liked) {
      notifyWish();
      updateWished(product._id, { wish });
      dispatch(addWish({ ...product }));
    } else {
      return;
    }
  };
  //=*=*=*=*=*=ADDING TO USER'S WISHLIST=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDED WISHED NOTIFICATION=*=*=*=*=*=//
  const notifyWish = () =>
    toast.warn("Added to wish list ♥", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: false,
      className: "toast-success-container toast-success-container-after",
    });
  //=*=*=*=*=*=ADDED WISHED NOTIFICATION=*=*=*=*=*=[END]//

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
      <ProductImage src={product.img} />
      <ProductInfo>
        <Desc>
          <BrandName>{product.name}</BrandName>
          <Color color={product.color} />
          <Size>{product.size}</Size>
        </Desc>
        <Quantity>
          <RemoveIcon
            fontSize="small"
            className="cursor-pointer opacity-20 hover:opacity-100"
            onClick={() => handleQuantity("dec")}
          />
          <Amount>{quantity}</Amount>
          <AddIcon
            fontSize="small"
            className="cursor-pointer opacity-20 hover:opacity-100"
            onClick={() => handleQuantity("inc")}
          />
        </Quantity>
      </ProductInfo>
      <Price>$ {product.price * product.quantity}.00</Price>
      <SideBar>
        <CloseIcon
          onClick={() => {
            handleClose();
            setIsRemove(true);
          }}
          className="cursor-pointer hover:scale-110"
          style={{ transition: "1s" }}
        />
        <WishIcon onClick={handleAddToWishList}>
          {liked ? (
            <FavoriteIcon className="!text-yellow-300 hover:!text-yellow-500" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </WishIcon>
      </SideBar>
    </Container>
  );
};

export default AddedProduct;
