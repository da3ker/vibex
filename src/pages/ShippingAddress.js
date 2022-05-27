import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";
import { addTempoDetails } from "../redux/tempoShippingRedux";
import { reset } from "../redux/userRedux";

//Components~~~
import AfterNavBar from "../components/AfterNavBar";
import AfterFooter from "../components/AfterFooter";

//Icons~~~
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Container = styled.div`
  ${tw`max-w-full w-screen h-screen absolute overflow-x-hidden`}
`;
const Wrapper = styled.div`
  ${tw`lg:w-5/6 w-11/12  mt-10 mx-auto flex flex-col`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Left = styled.div`
  ${tw`lg:w-3/5 w-full`}
`;
const Top = styled.div`
  ${tw`w-full`}
`;
const Title = styled.h3`
  ${tw`text-3xl font-bold mb-3`}
`;
const Form = styled(motion.form)`
  ${tw`w-full`}
`;
const TwoWrapper = styled.div`
  ${tw`flex lg:gap-3 gap-0 w-full lg:flex-row flex-col`}
`;
const InputWrapper = styled.div`
  ${tw`flex flex-col mb-4`}
`;
const Section = styled.label`
  ${tw`font-medium mb-px opacity-0`}
  transition: 1s;
`;
const Input = styled.input`
  ${tw`w-full  h-12 px-4 uppercase`}
  border: 1px solid #808080;
`;
const Bottom = styled.div`
  ${tw`lg:w-3/5 w-full mt-4`}
`;
const SubTitle = styled.h5`
  ${tw`text-sm mb-3`}
`;
const Review = styled.button`
  ${tw`w-52 h-12 bg-black text-white my-4 flex justify-between px-4 items-center cursor-pointer hover:text-gray-400`}
`;
const CheckBoxWrapper = styled.div`
  ${tw`flex items-center gap-1`}
`;
const Label = styled.label`
  ${tw`text-xs font-semibold text-gray-600`}
`;
const Checkbox = styled.input`
  ${tw``}
`;

const Error = styled.span`
  ${tw` text-xs font-semibold text-red-300`}
`;

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser?._id;
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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

  //[START]=*=*=*=*=*=FETCHING SHIPPING DETAILS*=*=*=*=*=//
  const [dataForm, setDataForm] = useState({
    firstName: currentUser?.shippingDetails.firstName
      ? currentUser?.shippingDetails.firstName
      : "",
    lastName: currentUser?.shippingDetails.lastName
      ? currentUser?.shippingDetails.lastName
      : "",
    address: currentUser?.shippingDetails.address
      ? currentUser?.shippingDetails.address
      : "",
    state: currentUser?.shippingDetails.state
      ? currentUser?.shippingDetails.state
      : "",
    city: currentUser?.shippingDetails.city
      ? currentUser?.shippingDetails.city
      : "",
    postal: currentUser?.shippingDetails.postal
      ? currentUser?.shippingDetails.postal
      : "",
    email: currentUser?.shippingDetails.email
      ? currentUser?.shippingDetails.email
      : "",
    phone: currentUser?.shippingDetails.phone
      ? currentUser?.shippingDetails.phone
      : "",
  });

  const { firstName, lastName, address, state, city, postal, email, phone } =
    dataForm;

  const onChange = (event) => {
    setDataForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  //=*=*=*=*=*=FETCHING SHIPPING DETAILS*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SUBMITTING SHIPPING DETAILS*=*=*=*=*=//
  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !state ||
      !city ||
      !postal ||
      !phone
    ) {
      setError(true);
      return;
    }

    if (document.getElementById("save").checked) {
      updateUser(dispatch, id, { shippingDetails: dataForm });
      navigate("/payment");
    } else {
      dispatch(addTempoDetails({ ...dataForm }));
      navigate("/payment");
    }
  };
  //=*=*=*=*=*=SUBMITTING SHIPPING DETAILS*=*=*=*=*=[END]//

  //=*=*=*=*=*=RESETTING ERRORS*=*=*=*=*=[//
  useEffect(() => {
    dispatch(reset());
  }, [dispatch, error]);

  return (
    <Container>
      <AfterNavBar opacity={"opacity-50"} />
      <Wrapper>
        <Left>
          <Top>
            <Title>SHIPPING ADDRESS</Title>
            <Form
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <TwoWrapper>
                <InputWrapper className="flex-1">
                  <Section htmlFor="firstName" id="firstName_">
                    First Name
                  </Section>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    required
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                  />
                </InputWrapper>
                <InputWrapper className="flex-1">
                  <Section htmlFor="lastName" id="lastName_">
                    Last Name
                  </Section>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    required
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                  />
                </InputWrapper>
              </TwoWrapper>
              <InputWrapper>
                <Section htmlFor="address" id="address_">
                  Street Address
                </Section>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street Address *"
                  value={address}
                  required
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                />
              </InputWrapper>
              {/* <InputWrapper>
                <Section htmlFor="barangay" id="barangay_">
                  Barangay
                </Section>
                <Input
                  id="barangay"
                  name="barangay"
                  type="text"
                  placeholder="Barangay *"
                  required
                  onChange={handleChange}
                />
              </InputWrapper> */}
              <TwoWrapper>
                <InputWrapper className="flex-1">
                  <Section htmlFor="state" id="state_">
                    State
                  </Section>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State *"
                    value={state}
                    required
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                  />
                </InputWrapper>
                <InputWrapper className="flex-1">
                  <Section htmlFor="city" id="city_">
                    City/Municipality
                  </Section>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City/Municipality *"
                    value={city}
                    required
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                  />
                </InputWrapper>
              </TwoWrapper>
              <InputWrapper>
                <Section htmlFor="postal" id="postal_">
                  Postal
                </Section>
                <Input
                  id="postal"
                  name="postal"
                  type="text"
                  placeholder="Postal *"
                  value={postal}
                  required
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                />
              </InputWrapper>
              <CheckBoxWrapper>
                <Checkbox type="checkbox" id="save" name="save" value="yes" />
                <Label htmlFor="save">Save shipping details?</Label>
              </CheckBoxWrapper>
            </Form>
          </Top>
          <Bottom>
            <Title>CONTACT INFORMATION</Title>
            <SubTitle>
              We'll use these details to keep you informed on your delivery.
            </SubTitle>
            <Form
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <InputWrapper>
                <Section htmlFor="email" id="email_">
                  Email
                </Section>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  className="!normal-case"
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <Section htmlFor="phone" id="phone_">
                  Phone Number
                </Section>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  required
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                />
              </InputWrapper>
            </Form>
          </Bottom>
          {error && <Error>Please fill out all required sections.</Error>}
          <Review type="submit" onClick={handleSubmit}>
            REVIEW & PAY <ArrowRightAltIcon fontSize="large" />
          </Review>
        </Left>
      </Wrapper>
      <AfterFooter />
    </Container>
  );
};

export default ShippingAddress;
