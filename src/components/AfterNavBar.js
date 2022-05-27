import tw, { styled } from "twin.macro";
import logo from "../vlogo.png";
import { Link, useLocation } from "react-router-dom";

//ICONS~~~
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

const Container = styled.div`
  ${tw`w-full h-32`}
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;
const Wrapper = styled.div`
  ${tw`lg:w-5/6 w-11/12 mt-2 mx-auto h-full flex flex-col `}
`;
const Top = styled.div`
  ${tw`w-full flex justify-between flex-1`}
`;
const Logo = styled.img`
  ${tw`h-16`}
`;
const Connect = styled.ul`
  ${tw`lg:text-xs text-[10px]`}
`;
const Title = styled.li`
  ${tw`font-semibold`}
`;
const List = styled.li`
  ${tw``}
`;
const Bottom = styled.div`
  ${tw`flex flex-none h-10 mb-1`}
`;
const Button = styled.div`
  ${tw`flex items-center lg:mr-6 mr-2 lg:text-sm text-[7px]`}
`;
const Circle = styled.div`
  ${tw`lg:w-6 lg:h-6 w-4 h-4 rounded-full flex justify-center items-center bg-black text-white font-bold mr-1`}
`;
const Text = styled.h4`
  ${tw`tracking-widest font-semibold `}
`;

const AfterNavBar = ({ opacity }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <Container>
      <Wrapper>
        <Top>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <Connect>
            <Title>CONNECT</Title>
            <List>
              <LocationOnIcon fontSize="small" className="mr-1" />
              Dagupan City, Pangasinan
            </List>
            <List>
              <PhoneIcon fontSize="small" className="mr-1" />
              +639081111111
            </List>
            <List>
              <MailIcon fontSize="small" className="mr-1" />
              vibexofficial@gmail.com
            </List>
          </Connect>
        </Top>
        <Bottom>
          <Button>
            <Circle>1</Circle>
            <Text>BAG</Text>
          </Button>
          <Button>
            <Circle>2</Circle>
            <Text>SHIPPING ADDRESS</Text>
          </Button>
          <Button className={path !== "payment" && opacity}>
            <Circle>2</Circle>
            <Text>PAYMENT</Text>
          </Button>
          <Button className={opacity}>
            <Circle>3</Circle>
            <Text>ORDER COMPLETE</Text>
          </Button>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default AfterNavBar;
