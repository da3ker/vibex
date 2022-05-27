import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";

//Icons~~~
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../redux/searchRedux";
import useFetchProduct from "../useFetchProduct";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  ${tw`w-screen h-screen top-0 left-0 z-20 bg-white hidden overflow-y-auto`}
`;

const SearchContainer = styled.div`
  ${tw`w-full h-12 bg-gray-200 flex items-center px-4 mb-2`}
`;

const Back = styled.div`
  ${tw``}
`;

const Search = styled.input`
  ${tw`w-full h-full bg-transparent focus:outline-none`}
`;
const SearchResults = styled.div`
  ${tw``}
`;
const Product = styled.div`
  ${tw`flex h-32 self-start mb-4 ml-2`}
  box-shadow: rgba(0, 0, 0, 0.15) -2.4px 2.4px 3.2px;
`;
const Img = styled.img`
  ${tw`object-contain mr-4`}
`;
const InfoWrapper = styled.div`
  ${tw`flex flex-col gap-2`}
`;
const Info = styled.h3`
  ${tw`text-sm font-semibold uppercase`}
`;
const Colors = styled.div`
  ${tw`flex`}
`;
const Color = styled.div`
  ${tw`w-4 h-4 rounded-sm mr-1 border-2 cursor-pointer`}
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
`;
const Sizes = styled.div`
  ${tw`flex gap-2 text-xs font-bold uppercase `}
`;
const Size = styled.div`
  ${tw`border-2 border-black px-1`}
`;
const Price = styled.div`
  ${tw`text-sm font-semibold text-red-500 mt-2`}
`;
const variants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

const SideSearch = ({ search, setSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  //=*=*=*=*=*=GLOBAL SEARCH=*=*=*=*=*=//
  useEffect(() => {
    dispatch(searchProduct(searchInput));
  }, [searchInput]);

  //=*=*=*=*=*=USEFETCH (FETCHING PRODUCTS)=*=*=*=*=*=//
  const { products } = useFetchProduct("all");
  return (
    <Container
      className={search && "!block"}
      animate={search ? "open" : "closed"}
      transition={{ duration: 1 }}
      variants={variants}
      initial={"closed"}
    >
      <SearchContainer>
        <Back onClick={() => setSearch(false)}>
          <ArrowBackIosIcon fontSize="small" />
        </Back>
        <Search
          placeholder="Search"
          type="search"
          id="search"
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
      </SearchContainer>
      {searchInput && (
        <SearchResults>
          {products
            .filter(
              (i) =>
                i.name.toLowerCase().includes(searchInput) ||
                i.categories.join().toLowerCase().includes(searchInput) ||
                i.colors.join().toLowerCase().includes(searchInput) ||
                i.sizes.join().toLowerCase().includes(searchInput)
            )
            .map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                onClick={() => setSearch(false)}
              >
                <Product>
                  <Img src={item.img} />
                  <InfoWrapper>
                    <Info>{item.name}</Info>
                    <Colors>
                      {item.colors.map((c) => (
                        <Color color={c} key={c} />
                      ))}
                    </Colors>
                    <Sizes>
                      {item.sizes.map((s) => (
                        <Size key={s}>{s}</Size>
                      ))}
                    </Sizes>
                    <Price>${item.price}.00</Price>
                  </InfoWrapper>
                </Product>
              </Link>
            ))}
        </SearchResults>
      )}
    </Container>
  );
};

export default SideSearch;
