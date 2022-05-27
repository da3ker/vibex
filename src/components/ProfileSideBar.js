import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

//MODALS~~~
import FaqModal from "../info-modals/Faq";
import PreOderModal from "../info-modals/PreOrder";
import PrivacyModal from "../info-modals/PrivacyPolicy";
import ReturnModal from "../info-modals/ReturnPolicy";
import CompanyInfoModal from "../info-modals/CompanyInfo";
import ContactUsModal from "../info-modals/ContactUs";

const Container = styled(motion.div)`
  ${tw`px-14 sm:pt-10 pt-0 flex-1 sm:scale-100 scale-75 `}
`;
const MiniTitle = styled.h4`
  ${tw`text-lg font-bold my-2`}
`;
const Section = styled.div`
  ${tw`pb-6 mb-6 border-b-[1px] border-gray-700`}
`;
const List = styled.p`
  ${tw`font-medium underline tracking-wider mb-1 cursor-pointer hover:font-semibold`}
  text-decoration-thickness: 1px;
`;
const Contact = styled.div`
  ${tw`text-base font-semibold`}
`;
const Phone = styled.p`
  ${tw`text-sm font-medium pl-2 tracking-wider mt-1 cursor-pointer hover:underline `}
  text-decoration-thickness: 1px;
`;
const Email = styled.p`
  ${tw`text-sm font-medium pl-2  tracking-wider cursor-pointer hover:underline hover:font-semibold`}
  text-decoration-thickness: 1px;
`;

const ProfileSideBar = () => {
  //=*=*=*=*=*=TOGGLE INFO MODAL=*=*=*=*=*=//
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <Container
      initial={{ y: "-100vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Section className="sm:border-r-0 border-r-[1px]">
        <Link to="/myOrders">
          <List>My Orders</List>
        </Link>
        <Link to="/wishList">
          <List>Wish List</List>
        </Link>
      </Section>
      <Section className="sm:border-l-0 border-l-[1px] sm:text-left text-right">
        <MiniTitle>NEED HELP?</MiniTitle>
        <List onClick={() => setIsModalOpen(1)}>FAQ</List>
        <List onClick={() => setIsModalOpen(2)}>Pre-Order</List>
        <List onClick={() => setIsModalOpen(3)}>Privacy Policy</List>
        <List onClick={() => setIsModalOpen(4)}>Return Policy</List>
        <List onClick={() => setIsModalOpen(5)}>Company Information</List>
      </Section>
      <Contact>
        CONTACT US
        <Phone onClick={() => setIsModalOpen(6)}>+639081111111</Phone>
        <Email onClick={() => setIsModalOpen(6)}>itsvibex.co@gmail.com</Email>
      </Contact>
      <FaqModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <PreOderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <PrivacyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ReturnModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <CompanyInfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ContactUsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default ProfileSideBar;
