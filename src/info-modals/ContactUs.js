import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { Modal } from "@mui/material";
import logox from "../logoX.png";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  ${tw`rounded-lg py-8 sm:px-16 px-2 text-justify text-gray-600 text-sm flex flex-col items-center overflow-y-auto bg-white outline-none border-4 border-gray-600`}
`;
const Title = styled.h1`
  ${tw`font-bold text-2xl mb-4 tracking-wider uppercase`}
`;
const Wrapper = styled(motion.div)`
  ${tw`flex flex-col gap-4`}
`;
const Form = styled.form`
  ${tw`flex flex-col gap-4`}
`;
const Top = styled.div`
  ${tw`flex gap-2 items-center`}
`;
const Label = styled.label`
  ${tw`font-semibold uppercase tracking-wider`}
`;
const Input = styled.input`
  ${tw`outline-none border-none p-2 rounded-r-md font-medium`}
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const Body = styled.div`
  ${tw`flex gap-2 relative`}
`;
const BodyLabel = styled.label`
  ${tw`font-semibold uppercase tracking-wider rotate-[270deg] absolute left-[-2rem] bottom-8`}
`;
const TextArea = styled.textarea`
  ${tw`resize-none p-2 outline-none w-64 h-40 ml-5 rounded-md`}
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const Submit = styled.button`
  ${tw`self-end px-2 py-1 font-bold text-sm tracking-wider rounded-sm border-2 border-gray-500 scale-95 hover:scale-105 hover:bg-gray-800 hover:text-white`}
  transition:1s;
`;
const Logo = styled.img`
  ${tw`h-8 object-contain absolute bottom-1 left-1 opacity-75`}
`;
const Error = styled.p`
  ${tw` text-red-300 font-medium text-sm tracking-wider uppercase text-[9px] absolute right-1 bottom-1`}
`;
const WhiteBg = styled.div`
  ${tw`absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center`}
`;
const LoadingBox = styled.div`
  ${tw`w-1/3 text-black border-4 border-black font-bold flex items-center justify-center tracking-widest text-xl`}
  aspect-ratio: 1 / 1;
  animation: anima 2s linear infinite;
  @keyframes anima {
    0% {
      transform: rotate(45deg) scale(0.05);
      border-radius: 0;
    }
    50% {
      transform: rotate(90deg) scale(1);
      border-radius: 0;
      background-color: #000;
      color: #fff;
    }
    100% {
      transform: rotate(135deg) scale(0);
      border-radius: 20%;
    }
  }
`;
const Success = styled.div`
  ${tw`text-green-400 flex flex-col items-center justify-center`}
`;

const ContactUsModal = ({ isModalOpen, setIsModalOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser?._id;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //[START]=*=*=*=*=*=SUBMITTING MESSAGE=*=*=*=*=*=//
  const createMessage = async (msg) => {
    setIsSubmitting(true);
    setError(false);
    setSuccess(false);
    try {
      await userRequest.post("/messages/", msg);
      setSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    createMessage({
      userId: id,
      subject,
      message,
    });
  };
  //=*=*=*=*=*=SUBMITTING MESSAGE=*=*=*=*=*=[END]//

  //=*=*=*=*=*=CLEANING LOCAL DATA=*=*=*=*=*=//
  const afterSuccess = () => {
    setSubject("");
    setMessage("");
    setSuccess(false);
  };

  return (
    <Modal
      open={isModalOpen === 6}
      onClose={(e) => setIsModalOpen(false)}
      className="flex justify-center items-center backdrop-blur-sm"
    >
      <Container
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Contact Us</Title>
        <Wrapper>
          <Form>
            <Top>
              <Label>Subject:</Label>
              <Input
                type="text"
                required
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Top>
            <Body>
              <BodyLabel>MESSAGE:</BodyLabel>
              <TextArea
                type="text"
                required
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Body>
          </Form>
          <Submit onClick={handleSubmit}>Submit</Submit>
          <Logo src={logox} />
          {error && <Error>Please fill out all input fields.</Error>}
          {isSubmitting && (
            <WhiteBg>
              <LoadingBox>VIBEX</LoadingBox>
            </WhiteBg>
          )}
          {success && (
            <WhiteBg
              onClick={(e) => {
                setIsModalOpen(false);
                afterSuccess();
              }}
            >
              <Success>
                <div className="text-base font-medium">
                  <span className="text-3xl">♥</span>
                  <span className="text-2xl">♥</span>
                  <span className="text-xl">♥</span> Thank you for messaging us{" "}
                  <span className="text-xl">♥</span>
                  <span className="text-2xl">♥</span>
                  <span className="text-3xl">♥</span>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-lg">♥</span>♥
                  <span className="text-xs">♥</span> We recived and appreciate
                  it <span className="text-xs">♥</span>♥
                  <span className="text-lg">♥</span>
                </div>
              </Success>
            </WhiteBg>
          )}
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ContactUsModal;
