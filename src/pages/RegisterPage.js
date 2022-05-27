import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { registerFailure, reset } from "../redux/userRedux";
import Loading from "../components/Loading";

//Icons~~~
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Container = styled(motion.div)`
  ${tw`max-w-full w-screen overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`mx-auto mt-28 mb-10 flex lg:w-1/2 w-5/6 flex-col items-center gap-1 min-h-full`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Title = styled.h2`
  ${tw`lg:text-3xl text-2xl font-bold m-1`}
`;
const Form = styled.form`
  ${tw`flex flex-col items-center gap-2`}
`;
const InputWrapper = styled.div`
  ${tw`flex flex-col w-full`}
`;
const Section = styled.label`
  ${tw`text-sm font-semibold opacity-0 `}
  transition: 1s;
`;
const Error = styled.span`
  ${tw`text-xs font-light text-red-500 tracking-wider`}
`;
const Input = styled.input`
  ${tw`w-full lg:text-base text-sm h-12 px-4 bg-transparent border-[1px] border-gray-600 outline-none`}
`;
const PasswordInput = styled.div`
  ${tw`w-full h-12 bg-transparent flex items-center border-[1px] border-gray-600`}
`;
const PasswordVisibility = styled.div`
  ${tw` mr-4 cursor-pointer`}
`;
const CheckBoxWrapper = styled.div`
  ${tw`w-full h-6 flex items-center`}
`;
const CheckboxBox = styled.div`
  ${tw` w-4 h-4 mr-1`}
`;
const CheckBox = styled.input`
  ${tw`w-4 h-full`}
`;
const LabelBox = styled.div`
  ${tw`h-full`}
`;
const Label = styled.label`
  ${tw`text-xs`}
`;

const Create = styled.button`
  ${tw`w-40 h-10 lg:my-2 mt-4 text-2xl font-bold bg-black text-white flex justify-center items-center rounded-lg cursor-pointer hover:rounded-none hover:scale-105 hover:bg-white hover:text-black hover:border-2 hover:border-black`}
  transition: 1s;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
// const Text = styled.h2`
//   ${tw`text-base`}
// `;
// const SignUpWith = styled.span`
//   ${tw`text-base font-light flex justify-between px-4 items-center cursor-pointer font-bold hover:underline hover:underline hover:bg-black hover:text-white`}
//   border: 2px solid #808080;
//   transition: 1s;
// `;
// const SignUpWrapper = styled.div`
//   ${tw`flex gap-1 lg:flex-row flex-col justify-between lg:w-1/2 w-72`}
// `;
const LoginWrapper = styled.div`
  ${tw`w-full flex flex-col items-center my-5`}
`;
const Question = styled.p`
  ${tw`text-sm font-light mb-3`}
`;
const Login = styled.div`
  ${tw`h-12 bg-gray-800 tracking-wider text-white w-72 flex justify-between px-3 font-bold text-lg items-center cursor-pointer hover:bg-black hover:scale-105`}
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  transition: 0.5s;
`;
const SuccessNotif = styled.div`
  ${tw`p-4 outline-none rounded-lg  bg-white/[.9] flex flex-col items-center justify-center gap-4 text-gray-700`}
`;
const SuccessTitle = styled.span`
  ${tw`font-semibold tracking-wider`}
`;
const SuccessMessage = styled.button`
  ${tw`py-1 px-4 font-medium bg-gray-800 text-white border-2 hover:scale-110 hover:bg-white hover:text-black hover:border-black rounded-md hover:rounded-none hover:font-bold`}
  transition:1s;
`;

const RegisterPage = () => {
  const [passVis, setPassVis] = useState("password");
  const [conPassVis, setConPassVis] = useState("password");

  //[START]=*=*=*=*=*=INPUT LABEL ANIMATION EFFECTS*=*=*=*=*=//
  const handleChange = (event) => {
    let myInput = document.getElementById(event.target.id + "_");
    if (event.target.value.length !== 0) {
      myInput.classList.add("!opacity-100");
    } else {
      myInput.classList.remove("!opacity-100");
    }
  };
  //=*=*=*=*=*=INPUT LABEL ANIMATION EFFECTS*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SETTING UP DATA FORM=*=*=*=*=*=//
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, username, email, password, confirmPassword } =
    formData;

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  //=*=*=*=*=*=SETTING UP DATA FORM=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=DISPATCHING REGISTERED DATA FORM=*=*=*=*=*=//
  const dispatch = useDispatch();
  const { isFetching, error, success } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(registerFailure("Password did not match"));
      return;
    }
    if (!document.getElementById("tAndC").checked) {
      dispatch(registerFailure("Please Accept our Terms & Condition"));
      return;
    }
    register(dispatch, { firstName, lastName, username, email, password });
  };
  //=*=*=*=*=*=DISPATCHING REGISTERED DATA FORM=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=//
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  //=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SUCCESS REGISTER MODAL=*=*=*=*=*=//
  useEffect(() => {
    if (success) {
      setIsOpen(true);
    }
  }, [success]);
  //=*=*=*=*=*=SUCCESS REGISTER MODAL=*=*=*=*=*=[END]//

  return (
    <Container
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Wrapper>
        <Title>Create Account</Title>
        <Form>
          <InputWrapper>
            <Section htmlFor="username" id="username_">
              Username
            </Section>
            <Input
              id="username"
              name="username"
              type="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => {
                handleChange(e);
                onChange(e);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Section htmlFor="firstName" id="firstName_">
              First Name
            </Section>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => {
                handleChange(e);
                onChange(e);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Section htmlFor="lastName" id="lastName_">
              Last Name
            </Section>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => {
                handleChange(e);
                onChange(e);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Section htmlFor="email" id="email_">
              Email
            </Section>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                handleChange(e);
                onChange(e);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Section htmlFor="password" id="password_">
              Password
            </Section>
            <PasswordInput>
              <Input
                id="password"
                name="password"
                type={passVis}
                placeholder="Password"
                required
                className="!border-0"
                value={password}
                onChange={(e) => {
                  handleChange(e);
                  onChange(e);
                }}
              />
              <PasswordVisibility>
                {passVis === "text" ? (
                  <VisibilityIcon onClick={() => setPassVis("password")} />
                ) : (
                  <VisibilityOffIcon
                    className="text-gray-500"
                    onClick={() => setPassVis("text")}
                  />
                )}
              </PasswordVisibility>
            </PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <Section htmlFor="confirmPassword" id="confirmPassword_">
              Confirm Password
            </Section>
            <PasswordInput>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={conPassVis}
                placeholder="Confirm Password"
                required
                className="!border-0"
                value={confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                  onChange(e);
                }}
              />
              <PasswordVisibility>
                {conPassVis === "text" ? (
                  <VisibilityIcon onClick={() => setConPassVis("password")} />
                ) : (
                  <VisibilityOffIcon
                    className="text-gray-500"
                    onClick={() => setConPassVis("text")}
                  />
                )}
              </PasswordVisibility>
            </PasswordInput>
          </InputWrapper>
          {/* <CheckBoxWrapper>
            <CheckboxBox>
              <CheckBox type="checkbox" id="emailMe" />
            </CheckboxBox>
            <LabelBox>
              <Label htmlFor="emailMe">Email me with News and Offers</Label>
            </LabelBox>
          </CheckBoxWrapper> */}
          <CheckBoxWrapper>
            <CheckboxBox>
              <CheckBox
                type="checkbox"
                id="tAndC"
                name="tAndC"
                value="accepted"
              />
            </CheckboxBox>
            <LabelBox>
              <Label htmlFor="tAndC">
                I have read and accepted Terms & Conditions and the vibex
                Privacy Policy
              </Label>
            </LabelBox>
          </CheckBoxWrapper>
          {error && <Error>{error}</Error>}
          <Create type="submit" onClick={handleRegister} disabled={isFetching}>
            Create
          </Create>
        </Form>
        {/* <Text>Or</Text>
        <Text className="font-semibold">Sign up with</Text>
        <SignUpWrapper>
          <SignUpWith>
            Facebook
            <FacebookRoundedIcon fontSize="large" />
          </SignUpWith>
          <SignUpWith>
            Google
            <GoogleIcon fontSize="large" />
          </SignUpWith>
        </SignUpWrapper> */}
        <LoginWrapper>
          <Question>Have an account already?</Question>
          <Link to="/login">
            <Login>
              LOGIN <ArrowForwardIcon />
            </Login>
          </Link>
        </LoginWrapper>
      </Wrapper>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <SuccessNotif>
          <SuccessTitle>
            Congratulations on creating your new account!
          </SuccessTitle>
          <Link to="/login">
            <SuccessMessage>Login now!</SuccessMessage>
          </Link>
        </SuccessNotif>
      </Modal>
      {isFetching && <Loading />}
    </Container>
  );
};

export default RegisterPage;
