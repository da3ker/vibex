import salebanner from "../banner-images/sale-banner.png";
import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { addWish } from "../redux/wishlistRedux";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Icons~~~
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

const Hover = styled.div`
  ${tw`w-full h-full absolute top-0 left-0 flex justify-center items-center opacity-0`}
  background-color: rgba(0, 0, 0, 0.08);
`;

const Container = styled.div`
  ${tw`w-64 h-96 flex flex-col justify-start  relative hover:scale-105`}
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: 0.7s;
`;
const Wrapper = styled.div`
  ${tw`w-full h-full`}
  &:hover ${Hover} {
    opacity: 1;
  }
`;
const DealTag = styled.div`
  ${tw`p-1 text-xs text-white font-medium bg-red-600 w-max absolute right-0 top-0`}
`;
const SaleTag = styled.img`
  ${tw`absolute right-0 top-0 h-20 object-contain`}
`;
const Desc = styled.div`
  ${tw`absolute w-full`}
  bottom: -5.5rem;
`;
const TopDesc = styled.div`
  ${tw`flex justify-between w-full`}
`;
const Colors = styled.div`
  ${tw``}
`;
const Sizes = styled.div`
  ${tw``}
`;
const SizesContainer = styled.div`
  ${tw`text-xs text-gray-700 flex my-1 justify-end`}
`;
const SizeBox = styled.div`
  ${tw`w-6 h-4 mr-1 border-[1px] border-gray-500 flex justify-center items-center font-medium cursor-pointer`}
`;
const Available = styled.p`
  ${tw`text-xs`}
`;
const Brand = styled.p`
  ${tw`text-sm font-medium`}
`;
const Price = styled.div`
  ${tw`flex items-center gap-1`}
`;
const Old = styled.s`
  ${tw`font-normal text-black`}
`;
const New = styled.p`
  ${tw`font-semibold text-sm`}
  ${({ color }) => color === "black" && tw`text-black`};
  ${({ color }) => color === "red" && tw`text-red-600`};
`;
const BoxContainer = styled.div`
  ${tw`flex my-1`}
`;
const Box = styled.div`
  ${tw`w-4 h-4 rounded-sm mr-2 border-2 cursor-pointer`}
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
`;
const Icon = styled(motion.button)`
  ${tw`w-10 h-10 rounded-full flex justify-center items-center m-2 z-10 hover:bg-gray-400 hover:text-white hover:scale-125 cursor-pointer`}
  transition: all 0.5s ease-in;
  background-color: rgba(229, 229, 229, 0.9);
`;

const Product = ({ item }) => {
  const [color, setColor] = useState(item.colors[0]);
  const [size, setSize] = useState(item.sizes[0]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { products } = useSelector((state) => state.wishlist);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const quantity = 1;
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

  //[START]=*=*=*=*=*=FETCHING PRODUCT DATA=*=*=*=*=*=//
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + item._id);
        setSelectedProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [item._id]);
  //=*=*=*=*=*=FETCHING PRODUCT DATA=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=//
  useEffect(() => {
    let wished = products.find((i) => i._id === item._id);
    if (wished) {
      setLiked(true);
    }
  }, [item._id, products]);
  //=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDING TO USER'S CART=*=*=*=*=*=//
  const handleAddToCart = () => {
    notifyCart();
    dispatch(addProduct({ ...selectedProduct, quantity, color, size }));
  };
  //=*=*=*=*=*=ADDING TO USER'S CART=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDING TO USER'S WISHLIST=*=*=*=*=*=//
  const handleAddToWishList = () => {
    if (!liked) {
      notifyWish();
      updateWished(selectedProduct._id, { wish });
      dispatch(addWish({ ...selectedProduct }));
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
      <Wrapper>
        <LazyLoadImage
          src={item.img}
          alt={item.desc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full object-contain"
        />
        <DealTag className={!item.oldprice && "hidden"}>SAVE $2.00</DealTag>
        <SaleTag
          src={salebanner}
          className={!item.categories.includes("sale") && "hidden"}
        />
        <Hover>
          <Icon initial={{ rotate: 0 }} whileHover={{ rotate: 360 }}>
            <Link to={`/product/${item._id}`}>
              <SearchIcon />
            </Link>
          </Icon>
          <Icon onClick={handleAddToCart}>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Icon onClick={handleAddToWishList}>
            {liked ? (
              <FavoriteIcon className="!text-yellow-300 hover:!text-yellow-500" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Icon>
        </Hover>
      </Wrapper>
      <Desc>
        <TopDesc>
          <Colors>
            <Available>Available color:</Available>
            <BoxContainer>
              {item.colors.map((c) => (
                <Box
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                  className={
                    c === color &&
                    "!border-2 !border-sky-300 !rounded !opacity-60"
                  }
                />
              ))}
            </BoxContainer>
          </Colors>
          <Sizes>
            <Available>Available sizes:</Available>
            <SizesContainer>
              {item.sizes.map((s) => (
                <SizeBox
                  key={s}
                  onClick={() => setSize(s)}
                  className={s === size && "!bg-gray-200 !text-white"}
                >
                  {s}
                </SizeBox>
              ))}
            </SizesContainer>
          </Sizes>
        </TopDesc>
        <Brand>{item.name.toUpperCase()}</Brand>
        <Price>
          {item.oldprice && <Old>$ {item.oldprice}.00 </Old>}
          <New color={!item.oldprice ? "black" : "red"}>$ {item.price}.00</New>
        </Price>
      </Desc>
    </Container>
  );
};

export default Product;
