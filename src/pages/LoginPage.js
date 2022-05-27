import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/userRedux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

//Icons~~~
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import GoogleIcon from "@mui/icons-material/Google";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Container = styled(motion.div)`
  ${tw`max-w-full w-screen overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`mx-auto mt-40 mb-10  lg:w-1/2 w-5/6 flex flex-col items-center gap-1 min-h-full`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Title = styled.h2`
  ${tw`text-3xl font-bold m-2`}
`;
const Form = styled.form`
  ${tw`flex flex-col items-center gap-2 lg:w-1/2 w-72`}
`;
const InputWrapper = styled.div`
  ${tw`flex flex-col w-full`}
`;
const Section = styled.label`
  ${tw`text-sm font-semibold opacity-0`}
  transition: 1s;
`;
const Input = styled.input`
  ${tw`w-full h-12 px-4 bg-transparent outline-none border-[1px] border-gray-600`}
`;
const PasswordInput = styled.div`
  ${tw`w-full h-12 bg-transparent flex items-center border-[1px] border-gray-600`}
`;
const PasswordVisibility = styled.div`
  ${tw` mr-4 cursor-pointer`}
`;
const Forgot = styled.a`
  ${tw`lg:text-sm text-xs w-full text-right hover:underline mb-2 cursor-pointer`}
`;
const SignIn = styled.button`
  ${tw`w-40 h-10 my-2 text-2xl font-bold bg-black text-white flex justify-center items-center rounded-lg cursor-pointer hover:rounded-none hover:scale-105 hover:bg-white hover:text-black hover:border-2 hover:border-black`}
  transition: 1s;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  ${tw`text-xs font-light text-red-500 tracking-wider`}
`;
// const CheckBoxWrapper = styled.div`
//   ${tw`flex items-center justify-center gap-2 w-full`}
// `;
// const CheckBox = styled.input`
//   ${tw`w-4 h-4 `}
//   border: 1px solid #808080;
// `;
// const Label = styled.label`
//   ${tw`text-xs`}
// `;
const Text = styled.h2`
  ${tw`text-base`}
`;
const SignInWith = styled.span`
  ${tw`text-base font-light flex justify-between px-4 items-center cursor-pointer font-bold hover:underline hover:bg-black hover:text-white`}
  border: 2px solid #808080;
  transition: 1s;
`;
const SignInWrapper = styled.div`
  ${tw`flex gap-1 lg:flex-row flex-col justify-between lg:w-1/2 w-72`}
`;
const Register = styled.div`
  ${tw` w-full flex flex-col items-center my-5`}
`;
const Question = styled.p`
  ${tw`text-sm font-light mb-3`}
`;
const Create = styled.div`
  ${tw`h-12 bg-gray-800 tracking-wider text-white w-72 flex justify-between px-3 font-bold text-lg items-center cursor-pointer hover:bg-black hover:scale-105`}
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  transition: 0.5s;
`;

const LoginPage = () => {
  const [passVis, setPassVis] = useState("password");
  const [userAuth, setUserAuth] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

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

  //[START]=*=*=*=*=*=LOGGING-IN A USER=*=*=*=*=*=//
  const handleClick = (e) => {
    e.preventDefault();
    if (userAuth.includes("@")) {
      login(dispatch, { password, email: userAuth });
    } else {
      login(dispatch, { password, username: userAuth });
    }
  };
  //=*=*=*=*=*=LOGGING-IN A USER=*=*=*=*=*=[END]//

  //=*=*=*=*=*=RESETTING ERRORS=*=*=*=*=*=//
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <Container
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <InputWrapper>
            <Section htmlFor="user" id="user_">
              Email / Username
            </Section>
            <Input
              id="user"
              name="user"
              type="user"
              placeholder="Email / Username"
              required
              onChange={(e) => {
                handleChange(e);
                setUserAuth(e.target.value);
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
                className="!border-0"
                required
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
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
          {/* <Forgot>Forgotten Your Password?</Forgot> */}
          {/* <CheckBoxWrapper>
            <CheckBox type="checkbox" id="emailMe" />
            <Label htmlFor="emailMe">Keep me logged in.</Label>
          </CheckBoxWrapper> */}
          {error && <Error>{error}</Error>}
          <SignIn type="submit" onClick={handleClick} disabled={isFetching}>
            Login
          </SignIn>
        </Form>
        {/* <Text>Or</Text>
        <Text className="font-semibold">Login with</Text>
        <SignInWrapper>
          <SignInWith>
            Facebook
            <FacebookRoundedIcon fontSize="large" />
          </SignInWith>
          <SignInWith>
            Google
            <GoogleIcon fontSize="large" />
          </SignInWith>
        </SignInWrapper> */}
        <Register>
          <Question>No Account?</Question>
          <Link to="/register">
            <Create>
              CREATE AN ACCOUNT <DoubleArrowIcon />
            </Create>
          </Link>
        </Register>
      </Wrapper>
      {isFetching && <Loading />}
    </Container>
  );
};

export default LoginPage;
