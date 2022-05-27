import tw, { styled } from "twin.macro";
import logo from "../vlogo.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//ICONS~~~
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

//MODALS~~~
import FaqModal from "../info-modals/Faq";
import PreOderModal from "../info-modals/PreOrder";
import PrivacyModal from "../info-modals/PrivacyPolicy";
import ReturnModal from "../info-modals/ReturnPolicy";
import CompanyInfoModal from "../info-modals/CompanyInfo";
import ContactUsModal from "../info-modals/ContactUs";
import { useSelector } from "react-redux";

const Container = styled.div`
  ${tw`w-full lg:h-44 h-32 mt-auto`}
`;
const Wrapper = styled.div`
  ${tw`w-full bg-gray-100 flex  flex-col lg:grid grid-cols-5 gap-px lg:p-4 p-0`}
`;
const Section = styled.ul`
  ${tw`h-full flex-1 lg:text-left text-right`}
`;
const SocialMedias = styled.div`
  ${tw`mt-2 flex gap-3`}
`;
const Rounded = styled.div`
  ${tw`rounded-full h-8 w-8 lg:bg-gray-900 bg-white flex justify-center items-center lg:text-gray-100 text-black cursor-pointer hover:bg-gray-200 hover:text-black`}
  transition:1s;
`;
const Title = styled.div`
  ${tw`lg:block hidden text-lg tracking-wider font-bold mb-2`}
`;
const List = styled.li`
  ${tw`lg:text-xs xl:text-lg text-sm font-medium mt-1 cursor-pointer hover:underline pr-2`}
  @media only screen and (max-width:500px) {
    font-size: 7px;
  }
`;
const Subscribe = styled.div`
  ${tw`h-10 flex justify-center items-center overflow-hidden px-1`}
`;
const Text = styled.div`
  ${tw`lg:text-xs xl:text-lg font-medium mt-1 `}
`;
const SubInput = styled.input`
  ${tw`h-full xl:w-60 w-40 px-1 border-2 border-black focus:outline-none`}
`;
const Mail = styled.div`
  ${tw`w-10 h-full flex justify-center items-center border-2 border-black border-r-0 cursor-pointer`}
`;

const Tab = styled.a`
  ${tw``}
`;
const Logo = styled.img`
  ${tw`lg:h-24 h-16`}
`;

const Footer = () => {
  const location = useLocation();
  const [active, setActive] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  //=*=*=*=*=*=TOGGLE FOOTER ACTIVITY=*=*=*=*=*=//
  useEffect(() => {
    if (
      location.pathname === "/profile" ||
      location.pathname === "/myOrders" ||
      location.pathname === "/wishList"
    ) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [location]);

  //=*=*=*=*=*=TOGGLE INFO MODAL=*=*=*=*=*=//
  const [isModalOpen, setIsModalOpen] = useState();
  return (
    <Container className={!active && "!hidden"}>
      <Wrapper>
        <Section className="col-span-2 flex flex-col justify-center items-center">
          <Tab>
            <Logo src={logo} alt="Logo" />
          </Tab>
          <SocialMedias>
            <Rounded>
              <FacebookOutlinedIcon />
            </Rounded>
            <Rounded>
              <InstagramIcon />
            </Rounded>
            <Rounded>
              <TwitterIcon />
            </Rounded>
            <Rounded>
              <TelegramIcon />
            </Rounded>
            <Rounded>
              <YouTubeIcon />
            </Rounded>
          </SocialMedias>
        </Section>
        <Section className="lg:bg-transparent bg-black lg:text-black text-white lg:block flex justify-center gap-2">
          <Title>EXPLORE</Title>
          <List onClick={() => setIsModalOpen(5)}>About Us</List>
          <List onClick={() => setIsModalOpen(1)}>FAQ</List>
          <List onClick={() => setIsModalOpen(2)}>Pre-Order</List>
          <List onClick={() => setIsModalOpen(3)}>Privacy Policy</List>
          <List onClick={() => setIsModalOpen(4)}>Return Policy</List>
        </Section>
        <Section className="lg:block hidden">
          <Title>CONNECT</Title>
          <List>
            <a
              href="https://goo.gl/maps/S8scKj9QzjLytRaQ9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnIcon className="mr-1" />
              Dagupan City, Pangasinan
            </a>
          </List>
          <List onClick={() => currentUser && setIsModalOpen(6)}>
            <PhoneIcon className="mr-1" />
            +639081111111
          </List>
          <List onClick={() => currentUser && setIsModalOpen(6)}>
            <MailIcon className="mr-1" />
            itsvibex.co@gmail.com
          </List>
        </Section>
        <Section className="lg:block hidden opacity-0">
          <Title>SUBSCRIBE</Title>
          <Text>
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </Text>
          <br />
          <Subscribe>
            <Mail>
              <MailOutlineIcon fontSize="large" />
            </Mail>
            <SubInput type="text" placeholder="Enter your Email" />
          </Subscribe>
        </Section>
      </Wrapper>
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

export default Footer;
