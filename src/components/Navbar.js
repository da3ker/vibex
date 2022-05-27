import tw, { styled } from "twin.macro";
import logo from "../vlogo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { searchProduct } from "../redux/searchRedux";

//ICONS~~~
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

//COMPONENTS~~~
import SideSearch from "./SideSearch";
import SideNavBar from "./SideNavBar";

const Container = styled.div`
  ${tw`lg:h-28 h-20 bg-white w-screen fixed z-20 top-0`}
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const NavWrapper = styled.div`
  ${tw` h-full flex justify-around items-center`}
`;

const Category = styled.ul`
  ${tw`w-96 h-full hidden lg:flex justify-between items-center font-bold text-lg`}
`;
const List = styled.li`
  ${tw`cursor-pointer active:text-gray-300`}
  transition: 0.5s;
`;
const Alink = styled(motion.div)`
  ${tw`cursor-pointer active:text-gray-300`}
  transition: 0.5s;
`;
const Menu = styled(motion.div)`
  ${tw`cursor-pointer`}
`;

const SearchBar = styled.div`
  ${tw`lg:bg-gray-300 h-10 rounded flex justify-between items-center overflow-hidden`};
`;

const SearchInput = styled.input`
  ${tw`h-full border-2 border-gray-300 rounded-l text-base w-44 px-2 hidden lg:block focus:outline-none`}
`;

const Search = styled.div`
  ${tw`lg:hidden block`}
`;

const SearchIconContainer = styled.div`
  ${tw`w-12 h-full lg:flex hidden justify-center items-center cursor-pointer`}
`;

const Logo = styled.img`
  ${tw`lg:h-20 h-16`}
`;
const User = styled.span`
  ${tw`text-sm font-semibold px-2`}
`;
const AccountWrapper = styled.div`
  ${tw`cursor-pointer rounded-l-full hover:scale-105 hover:bg-black hover:text-white`}
  transition: 1s;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    fontWeight: 600,
    color: "white",
    backgroundColor: "black",
  },
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [absolute, setAbsolute] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { quantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  //=*=*=*=*=*=GLOBAL SEARCH=*=*=*=*=*=//
  useEffect(() => {
    dispatch(searchProduct(searchInput));
  }, [searchInput]);

  //=*=*=*=*=*=TOGGLE NAVBAR ACTIVITY=*=*=*=*=*=//
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/profile"
    ) {
      setAbsolute(true);
    } else {
      setAbsolute(false);
    }
  }, [location]);

  return (
    <Container className={absolute && "!shadow-none"}>
      <SideSearch search={search} setSearch={setSearch} />
      <SideNavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavWrapper>
        <Menu
          onClick={() => setIsOpen(true)}
          className="block lg:hidden"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <MenuIcon fontSize="large" />
        </Menu>
        <Link to="/">
          <Logo src={logo} alt="Logo" />
        </Link>
        <Category>
          <Link to="/products/hot-deals">
            <List>
              <Alink>HOT DEALS</Alink>
            </List>
          </Link>
          <Link to="/products/men">
            <List>
              <Alink>MEN</Alink>
            </List>
          </Link>
          <Link to="/products/women">
            <List>
              <Alink>WOMEN</Alink>
            </List>
          </Link>
        </Category>
        <SearchBar>
          <SearchInput
            type="search"
            placeholder="Search"
            id="search"
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          />
          <Search onClick={() => setSearch(true)}>
            <SearchIcon fontSize="large" />
          </Search>
          <Link to="/products/all">
            <SearchIconContainer>
              <SearchIcon fontSize="large" className="text-white" />
            </SearchIconContainer>
          </Link>
        </SearchBar>
        <Link to="/cart">
          <Alink>
            <StyledBadge badgeContent={quantity} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </StyledBadge>
          </Alink>
        </Link>
        <Link to="/profile">
          <AccountWrapper
            className={
              !currentUser ? "!rounded-full hidden lg:block" : "hidden lg:block"
            }
          >
            <AccountCircleIcon fontSize="large" />
            {currentUser && <User>{currentUser.firstName.toUpperCase()}</User>}
          </AccountWrapper>
        </Link>
      </NavWrapper>
    </Container>
  );
};

export default Navbar;
