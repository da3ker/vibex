import tw, { styled } from "twin.macro";
import logo from "../vlogo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Icons~~~
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

const Container = styled(motion.div)`
  ${tw`w-screen h-screen fixed top-0 left-0 z-20 bg-white`}
`;
const Top = styled.div`
  ${tw`w-full h-16 flex justify-center items-center`}
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;
const Logo = styled.img`
  ${tw`h-4/5 object-contain cursor-pointer`}
`;
const Close = styled(motion.div)`
  ${tw`cursor-pointer absolute right-0 mr-5`}
`;
const Mid = styled.ul`
  ${tw`w-full flex flex-col py-5`}
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;
const Category = styled.li`
  ${tw`flex px-2 text-base font-bold text-gray-200 w-full  `}
`;
const Alink = styled.div`
  ${tw`text-black active:text-white active:bg-black w-full text-center py-2 cursor-pointer`}
`;
const Deal = styled.li`
  ${tw`text-gray-200 text-lg flex w-full`}
`;
const Bottom = styled.div`
  ${tw`w-full flex justify-center items-start bg-black h-full`}
`;
const List = styled.div`
  ${tw`text-base font-semibold text-center text-white tracking-wider py-5 w-full cursor-pointer hover:font-bold hover:text-lg active:text-black`}
  transition: 1s;
`;

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const SideNavBar = ({ isOpen, setIsOpen }) => {
  return (
    <Container
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 1 }}
      variants={variants}
      initial={"closed"}
    >
      <Top>
        <Logo src={logo} />
        <Close
          onClick={() => setIsOpen(false)}
          whileHover={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          <CloseIcon fontSize="large" />
        </Close>
      </Top>
      <Mid>
        <Link to="/products/hot-deals" onClick={() => setIsOpen(false)}>
          <Category>
            <Alink>HOT DEALS</Alink>
          </Category>
        </Link>
        <Link to="/products/men" onClick={() => setIsOpen(false)}>
          <Category>
            <Alink>MEN</Alink>
          </Category>
        </Link>
        <Link to="/products/women" onClick={() => setIsOpen(false)}>
          <Category>
            <Alink>WOMEN</Alink>
          </Category>
        </Link>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <Deal>
            <Alink>NEW DESIGN</Alink>
          </Deal>
        </Link>
        <Link to="/products/vibex22" onClick={() => setIsOpen(false)}>
          <Deal>
            <Alink>VIBEX</Alink>
          </Deal>
        </Link>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <Deal>
            <Alink className="!text-red-500">SALE</Alink>
          </Deal>
        </Link>
      </Mid>
      <Bottom>
        <Link to="/profile" className="w-full" onClick={() => setIsOpen(false)}>
          <List>ACCOUNT</List>
        </Link>
      </Bottom>
    </Container>
  );
};

export default SideNavBar;
