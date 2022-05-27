import { useState } from "react";
import tw, { styled } from "twin.macro";
import logox from "../logoX.png";

//MODALS~~~
import PrivacyStatementModal from "../info-modals/PrivacyStatement";
import TacModal from "../info-modals/Terms&Conditions";

const Container = styled.div`
  ${tw`w-full h-20 bg-gray-500 relative mt-8`}
`;
const Logo = styled.img`
  ${tw`h-10 absolute top-2 left-2 lg:block hidden`}
`;
const Wrapper = styled.div`
  ${tw`lg:w-96 w-80 mx-auto flex h-full flex-col gap-2`}
`;
const Top = styled.div`
  ${tw`flex-1 w-full flex justify-center items-end text-xs font-medium text-white gap-2`}
`;
const Link = styled.div`
  ${tw`cursor-pointer hover:text-gray-300`}
`;
const Bottom = styled.div`
  ${tw` flex-1 w-full flex justify-center items-start`}
`;
const Credit = styled.p`
  ${tw`text-[10px] text-gray-300`}
`;

const AfterFooter = () => {
  //=*=*=*=*=*=TOGGLE INFO MODAL=*=*=*=*=*=//
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <Container>
      <Logo src={logox} />
      <Wrapper>
        <Top>
          | <Link onClick={() => setIsModalOpen(7)}>Privacy Statement</Link> |{" "}
          <Link onClick={() => setIsModalOpen(6)}>Terms and Conditions</Link> |
        </Top>
        <Bottom>
          <Credit>© 2022 vibex Philippines Inc.</Credit>
        </Bottom>
      </Wrapper>
      <TacModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <PrivacyStatementModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default AfterFooter;
