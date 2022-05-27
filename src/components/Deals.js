import tw, { styled } from "twin.macro";
import { useState } from "react";
import { useMouseOut } from "../useMouseOut";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//LOCAL DATA
import useFetchProduct from "../useFetchProduct";
import newdesignbanner from "../banner-images/new-design-banner.png";
import salebanner from "../banner-images/sale-banner.png";
import freeShipping from "../banner-images/free-shipping.png";

const Container = styled.div`
  ${tw`w-full fixed border-t border-white hidden lg:block`}
  z-index: 19;
  top: 112px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const ItemWrapper = styled.div`
  ${tw`w-full h-12 flex justify-center items-center  text-xs tracking-widest font-medium bg-white`}
`;

const Item = styled.div`
  ${tw`m-8 cursor-pointer `}
`;

//---Item Contents---

const ItemContent = styled.div`
  ${tw`w-full`}
`;

const ContentWrapper = styled.div`
  ${tw`h-72 w-full bg-white shadow-lg`}
`;

const ImgItem = styled.img`
  ${tw`h-full mx-5 object-contain`}
`;
const ImgWrapper = styled(motion.div)`
  ${tw`h-4/5`}
`;

//--New Design--start
const NewDesginWrapper = styled.div`
  ${tw`h-full w-full bg-white flex shadow-lg`}
`;

const NewDesign = styled.div`
  ${tw`flex-1 flex justify-center items-center `}
`;

const NdImg = styled.img`
  ${tw`flex-none 2xl:block hidden h-full`}
`;

//--New Design--end

//--Vibex Design--start

const VibexDesign = styled.div`
  ${tw`flex justify-center items-center h-full w-full`}
`;
//--Vibex Design--end

//--Sales Design--start
const Sales = styled.div`
  ${tw`flex justify-center items-center h-full w-full`}
`;
const SaleBanner = styled.img`
  ${tw`h-20 object-contain absolute top-10 right-0`}
`;
//--Sales Design--end

//--Voucher--start
const Voucher = styled.div`
  ${tw`flex justify-center items-center h-full w-full font-bold`}
`;
//--Voucher--end

//--Freeshipping--start
const FreeShipping = styled.img`
  ${tw`w-full`}
`;
//--Freeshipping--end

const Deals = () => {
  //[START]=*=*=*=*=*=MOUSEOUT EFFECT=*=*=*=*=*=//
  const [isOpen, setIsOpen] = useState();
  const toggle = (index) => {
    setIsOpen(index);
  };
  const domRef = useMouseOut(() => {
    setIsOpen();
  });
  //=*=*=*=*=*=MOUSEOUT EFFECT=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=USEFETCH (FETCHING PRODUCTS)=*=*=*=*=*=//
  const { products: vibex } = useFetchProduct("vibex22");
  const { products: newDesign } = useFetchProduct("new-design");
  const { products: sale } = useFetchProduct("sale");
  //=*=*=*=*=*=USEFETCH (FETCHING PRODUCTS)=*=*=*=*=*=[END]//

  return (
    <Container ref={domRef}>
      <ItemWrapper>
        <Link to="/products/new-design">
          <Item
            onMouseOver={() => {
              toggle(1);
            }}
            className={isOpen === 1 && "font-bold"}
          >
            NEW DESIGN
          </Item>
        </Link>
        <Link to="/products/vibex22">
          <Item
            onMouseOver={() => {
              toggle(2);
            }}
            className={isOpen === 2 && "font-bold"}
          >
            VIBEX22
          </Item>
        </Link>
        <Link to="/products/sale">
          <Item
            onMouseOver={() => toggle(3)}
            className={isOpen === 3 && "font-bold text-red-500"}
          >
            SALE
          </Item>
        </Link>
        <Item
          onMouseOver={() => toggle(4)}
          className={isOpen === 4 && "font-bold text-red-400"}
        >
          VOUCHER
        </Item>
        <Item
          onMouseOver={() => toggle(5)}
          className={isOpen === 5 && "font-bold text-red-400"}
        >
          FREE SHIPPING
        </Item>
      </ItemWrapper>
      <ItemContent>
        <ContentWrapper className={isOpen === 1 ? "block" : "hidden"}>
          <NewDesginWrapper>
            <NewDesign>
              {newDesign.slice(0, 4).map((item) => (
                <ImgWrapper key={item._id}>
                  <ImgItem src={item.img} key={item._id + Math.random()} />
                </ImgWrapper>
              ))}
            </NewDesign>
            <NdImg src={newdesignbanner} alt="New Design" />
          </NewDesginWrapper>
        </ContentWrapper>
        <ContentWrapper className={isOpen === 2 ? "block" : "hidden"}>
          <VibexDesign>
            {vibex.slice(0, 4).map((item) => (
              <ImgWrapper key={item._id}>
                <ImgItem src={item.img} key={item._id + Math.random()} />
              </ImgWrapper>
            ))}
          </VibexDesign>
        </ContentWrapper>
        <ContentWrapper className={isOpen === 3 ? "block" : "hidden"}>
          <Sales>
            {sale.map((item) => (
              <ImgWrapper className="!relative" key={item._id}>
                <ImgItem src={item.img} key={item._id + Math.random()} />
                <SaleBanner src={salebanner} key={item._id} />
              </ImgWrapper>
            ))}
          </Sales>
        </ContentWrapper>
        <ContentWrapper
          className={isOpen === 4 ? "block !text-red-400" : "hidden"}
        >
          <Voucher>Free Voucher when you purchase 10 items</Voucher>
        </ContentWrapper>
        <ContentWrapper className={isOpen === 5 ? "block !h-min" : "hidden"}>
          <FreeShipping src={freeShipping} />
        </ContentWrapper>
      </ItemContent>
    </Container>
  );
};

export default Deals;
