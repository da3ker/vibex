import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addWish } from "../redux/wishlistRedux";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethod";

//ICONS~~~
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Hover = styled.div`
  ${tw`w-full h-full absolute top-0 left-0 flex justify-center items-center opacity-0`}
  background-color: rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  ${tw`lg:scale-100 scale-90 w-64 h-80 flex items-center justify-center relative`}
  background-color:rgba(240, 249, 255, 0.7);
  &:hover ${Hover} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  ${tw`w-56 h-56 rounded-full bg-white absolute`}
`;

const Image = styled.img`
  ${tw`h-full w-full z-10 object-contain`}
`;

const Icon = styled.div`
  ${tw`w-10 h-10 rounded-full flex justify-center items-center m-2 z-10 hover:bg-gray-400 hover:text-white hover:scale-125 cursor-pointer`}
  transition: all 0.5s ease-in;
  background-color: rgba(229, 229, 229, 0.9);
`;

const Desc = styled.div`
  ${tw`absolute flex flex-col justify-center items-center`}
  bottom: -3rem;
`;

const Brand = styled.p`
  ${tw`text-xs`}
`;
const Price = styled.p`
  ${tw`font-bold text-lg`}
`;

const FeaturedProduct = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const { products } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
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

  //[START]=*=*=*=*=*=ADDING TO USER'S WISHLIST=*=*=*=*=*=//
  const handleAddToWishList = () => {
    if (!liked) {
      notifyWish();
      updateWished(item._id, { wish });
      dispatch(addWish({ ...item }));
    } else {
      return;
    }
  };
  //=*=*=*=*=*=ADDING TO USER'S WISHLIST=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=//
  useEffect(() => {
    let wished = products.find((i) => i._id === item._id);
    if (wished) {
      setLiked(true);
    }
  }, [item._id, products]);
  //=*=*=*=*=*=PRODUCT WISHED INDICATOR=*=*=*=*=*=[END]//

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

  return (
    <Container>
      <Circle />
      <Image src={item.img} alt="Sample Tshirt" />
      <Hover>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchIcon />
          </Link>
        </Icon>
        <Icon onClick={handleAddToWishList}>
          {liked ? (
            <FavoriteIcon className="!text-yellow-300 hover:!text-yellow-500" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </Icon>
      </Hover>
      <Desc>
        <Brand>{item.name}</Brand>
        <Price>$ {item.price}.00</Price>
      </Desc>
    </Container>
  );
};

export default FeaturedProduct;
