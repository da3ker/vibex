import tw, { styled } from "twin.macro";
import { Backdrop } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import newDesign from "../banner-images/new-design.png";

//Icons~~~
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

//Components~~~
import Products from "../components/Products";

const Container = styled.div`
  ${tw`max-w-full w-screen`}
`;

const SideFilter = styled(motion.div)`
  ${tw`h-full w-80 bg-white fixed z-30 top-0 py-10 px-5 z-30`}
`;
const Top = styled.div`
  ${tw`py-3 flex justify-between text-xl font-bold tracking-wider`}
`;
const Close = styled.div`
  ${tw`cursor-pointer`}
`;
const Bot = styled.div`
  ${tw`flex flex-col`}
`;
const Fselect = styled.select`
  ${tw`my-1 h-12 text-sm outline-none`}
  border-top: 1px solid black;
`;
const Foption = styled.option`
  ${tw`text-base`}
`;

//Filter Section---End

const Title = styled.h3`
  ${tw`text-xl font-bold lg:mt-40 mt-32 text-center uppercase `}
`;

const ContentWrapper = styled.div`
  ${tw`w-5/6 mx-auto `}
`;
const FilterContainer = styled.div`
  ${tw`h-9 mt-4 w-full flex justify-between items-center`}
`;

const Fwrapper = styled.div`
  ${tw`flex items-center`}
`;
const Clear = styled.div`
  ${tw`border-[1px] flex justify-between items-center cursor-pointer text-gray-400 hover:text-gray-300 hover:border-gray-400`}
`;

const Filter = styled.div`
  ${tw` py-2 px-7 text-sm relative cursor-pointer`}
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
const Sort = styled.select`
  ${tw` py-2 px-2 text-sm cursor-pointer`}
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
const Option = styled.option`
  ${tw``}
`;
const Banner = styled.img`
  ${tw`w-full mt-0.5 lg:opacity-100 opacity-50`}
`;

const variants = {
  open: { x: 0 },
  closed: { x: "-100vw" },
};

const ProductsPage = ({ product }) => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [clearBtn, setClearBtn] = useState(false);

  //[START]=*=*=*=*=*=TOGGLE ANIMATION=*=*=*=*=*=//
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  //=*=*=*=*=*=TOGGLE ANIMATION=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=FILTERING PRODUCTS=*=*=*=*=*=//
  const [filter, setFilter] = useState({});
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value.toLowerCase(),
    });
    setClearBtn(true);
  };
  //=*=*=*=*=*=FILTERING PRODUCTS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SORTING PRODUCTS=*=*=*=*=*=//
  const [sort, setSort] = useState("newest");
  //=*=*=*=*=*=SORTING PRODUCTS=*=*=*=*=*=[END]//

  return (
    <Container>
      <SideFilter
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 1 }}
        variants={variants}
        initial={"closed"}
      >
        <Top>
          FILTER
          <Close onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </Close>
        </Top>
        <Bot>
          <Fselect defaultValue="Color" name="colors" onChange={handleFilters}>
            <Foption disabled hidden>
              Color
            </Foption>
            <Foption>Yellow</Foption>
            <Foption>Black</Foption>
            <Foption>White</Foption>
          </Fselect>
          <Fselect defaultValue="Size" name="sizes" onChange={handleFilters}>
            <Foption disabled hidden>
              Size
            </Foption>
            <Foption>S</Foption>
            <Foption>M</Foption>
            <Foption>L</Foption>
          </Fselect>
        </Bot>
      </SideFilter>
      <Backdrop
        sx={{ color: "#fff", zIndex: 20 }}
        open={isOpen}
        onClick={() => setIsOpen(false)}
      />
      <Title>{category.replace("-", " ")}</Title>
      <ContentWrapper>
        <FilterContainer>
          <Fwrapper>
            <Filter onClick={() => toggle()}>
              <TuneIcon
                fontSize="small"
                className="absolute left-1 stroke-1 stroke-white"
              />
              Filter
            </Filter>
            <Clear
              onClick={() => {
                setFilter({});
                setClearBtn(false);
              }}
              className={clearBtn ? "!block" : "!hidden"}
            >
              <CloseIcon fontSize="small" />
            </Clear>
          </Fwrapper>
          <Sort onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="asc">Price (Low-High)</Option>
            <Option value="desc">Price (High-Low)</Option>
          </Sort>
        </FilterContainer>
        <Products category={category} filter={filter} sort={sort} />
      </ContentWrapper>
      <Banner src={newDesign} alt="New Design" />
    </Container>
  );
};

export default ProductsPage;
