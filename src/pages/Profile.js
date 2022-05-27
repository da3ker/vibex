import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/userRedux";
import { motion } from "framer-motion";
import { Modal } from "@mui/material";
import { deleteUser, updateUser } from "../redux/apiCalls";
import { clearCart } from "../redux/cartRedux";
import moment from "moment";

//Components~~~
import AfterFooter from "../components/AfterFooter";
import ProfileSideBar from "../components/ProfileSideBar";
import Loading from "../components/Loading";

//Icons~~~
import LogoutIcon from "@mui/icons-material/Logout";
import BackspaceIcon from "@mui/icons-material/Backspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Container = styled.div`
  ${tw`max-w-full w-screen h-screen absolute `}
`;
const Wrapper = styled.div`
  ${tw`mx-auto sm:mt-40 mt-32 mb-10 w-4/5 flex sm:flex-row flex-col sm:gap-0 gap-2 min-h-full overflow-x-hidden`}
  @media only screen and (min-height:1024px) {
    height: 100%;
  }
`;
const Left = styled(motion.div)`
  ${tw`sm:w-3/5 w-full uppercase`}
`;
const Title = styled.h2`
  ${tw`sm:text-4xl text-3xl sm:mb-10 mb-5 font-bold w-96 `}
`;
const Details = styled.div`
  ${tw``}
`;
const SubTitle = styled.h3`
  ${tw`sm:text-2xl text-xl font-bold mb-2`}
`;
const Info = styled.p`
  ${tw`font-medium text-base tracking-wider mb-1`}
`;
const Edit = styled.span`
  ${tw`font-bold text-base text-gray-400 cursor-pointer tracking-wider mb-1 hover:text-black hover:underline`}
  transition: 0.5s;
`;
const LoginDetails = styled.div`
  ${tw`sm:mt-10 mt-5`}
`;
const MiniTitle = styled.h4`
  ${tw`text-lg font-bold my-2`}
`;
const Manage = styled.div`
  ${tw`mt-14`}
`;
const Warning = styled.p`
  ${tw`text-xs font-light normal-case sm:w-4/5 w-full`}
`;
const Logout = styled.div`
  ${tw`border-2 border-black h-12 w-4/5 px-3 font-bold tracking-widest flex justify-between items-center my-2 cursor-pointer hover:font-extrabold hover:border-blue-900 hover:text-blue-900`}
  transition: 0.6s;
`;
const Delete = styled.div`
  ${tw`border-2 border-gray-600 text-gray-600 h-12 w-4/5 px-3 font-bold tracking-widest flex justify-between items-center mt-4 mb-2 cursor-pointer hover:border-red-300 hover:text-red-300`}
  transition: 0.6s;
`;
const Right = styled(motion.div)`
  ${tw``}
`;

//Warning Popup
const WarningPopUp = styled(motion.div)`
  ${tw`p-4 outline-none rounded-lg border-2 border-white bg-gray-900 flex flex-col gap-4 text-white `}
`;
const WarningTitle = styled.h3`
  ${tw`font-semibold tracking-wider `}
`;
const Options = styled.div`
  ${tw`flex justify-between`}
`;
const Option = styled.span`
  ${tw`py-1 px-4 cursor-pointer border-2 border-white rounded-md font-semibold tracking-wider hover:scale-110`}
  transition: 1s;
`;

//Update Popup
const EditPopup = styled(motion.div)`
  ${tw`p-8 border-2 border-gray-300 bg-white outline-none`}
`;
const EditTitle = styled.h2`
  ${tw`text-xl font-bold tracking-wider mb-4`}
`;
const EditForm = styled.form`
  ${tw`flex flex-col gap-4`}
`;
const EditSection = styled.div`
  ${tw`flex flex-col gap-1`}
`;
const EditLabel = styled.label`
  ${tw`font-semibold text-sm uppercase tracking-wider text-gray-700`}
`;
const EditInput = styled.input`
  ${tw`px-2 py-1 outline-none font-medium text-gray-600 tracking-wide border-l-4 border-gray-300`}
`;
const PasswordInput = styled.div`
  ${tw`flex items-center`}
`;
const PasswordVisibility = styled.div`
  ${tw` mr-4 cursor-pointer`}
`;
const Update = styled.button`
  ${tw`border-2 border-gray-100 text-gray-700 mt-4 p-2 font-bold tracking-wider hover:bg-black hover:scale-105 hover:text-white  `}
  transition:1s;
`;

//Success Notif
const SuccessMessage = styled(motion.div)`
  ${tw`font-semibold tracking-wider text-white bg-black/[.7] p-4 border-2 border-black rounded outline-none flex flex-col gap-2 items-center justify-center`}
`;
const LoginAgain = styled.span`
  ${tw`font-medium text-sm`}
`;

const Error = styled.span`
  ${tw`font-medium text-xs text-red-300 uppercase`}
`;

const ProfilePage = () => {
  const { currentUser, error, success, isFetching } = useSelector(
    (state) => state.user
  );
  const { cart } = useSelector((state) => state);
  const { wishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = currentUser._id;

  //[START]=*=*=*=*=*=FORCE REFRESH IF ERROR EXIST=*=*=*=*=*=//
  useEffect(() => {
    if (error === "Token not valid. Please refresh...") {
      dispatch(reset());
      window.location.reload(false);
    }
  }, [error, dispatch]);
  //=*=*=*=*=*=FORCE REFRESH IF ERROR EXIST=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=LOGGING-OUT USER=*=*=*=*=*=//
  const handleOut = async (e) => {
    e.preventDefault();
    await updateUser(dispatch, id, { status: false });
    dispatch(logout());
    dispatch(clearCart());
  };
  //=*=*=*=*=*=LOGGING-OUT USER=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=DELETING USER'S ACCOUNT=*=*=*=*=*=//
  const handleDelete = () => {
    deleteUser(id, dispatch);
  };
  //=*=*=*=*=*=DELETING USER'S ACCOUNT=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=//
  useEffect(() => {
    updateUser(dispatch, id, { personalCart: cart });
  }, [dispatch, id, cart]);
  //=*=*=*=*=*=UPDATING USER'S CART=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING USER'S WISHLIST=*=*=*=*=*=//
  useEffect(() => {
    updateUser(dispatch, id, { wishlist: wishlist.products });
  }, [dispatch, id, wishlist.products]);
  //=*=*=*=*=*=UPDATING USER'S WISHLIST=*=*=*=*=*=[END]//

  //[START][*][*][*][*][*]UPDATING USER'S PROFILE[*][*][*][*][*]//
  const [warningOpen, setWarningOpen] = useState(false);
  const [editOpen, setEditOpen] = useState();
  const [which, setWhich] = useState("");
  const [passVis, setPassVis] = useState("password");

  //[START]=*=*=*=*=*=TOGGLE EDIT MODALS=*=*=*=*=*=//
  const toggleEdit = (index) => {
    setEditOpen(index);
  };
  //=*=*=*=*=*=TOGGLE EDIT MODALS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=PERSONAL INFO FORM=*=*=*=*=*=//
  const [updatePersonalForm, setUpdatePersonalForm] = useState({
    updateFirstName: currentUser.firstName,
    updateLastName: currentUser.lastName,
    updateBirthday: currentUser.birthday,
    updateGender: currentUser.gender,
  });
  const { updateFirstName, updateLastName, updateBirthday, updateGender } =
    updatePersonalForm;

  const onPersonalFormChange = (event) => {
    setUpdatePersonalForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePersonalUpdate = (e) => {
    e.preventDefault();
    if (!updateBirthday) {
      updateUser(dispatch, id, {
        firstName: updateFirstName,
        lastName: updateLastName,
        gender: updateGender,
      });
    } else {
      updateUser(dispatch, id, {
        firstName: updateFirstName,
        lastName: updateLastName,
        birthday: updateBirthday,
        gender: updateGender,
      });
    }
  };
  //=*=*=*=*=*=PERSONAL INFO FORM=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=PERSONAL LOGIN DETAILS FORM=*=*=*=*=*=//
  const [updateLogin, setUpdateLogin] = useState({
    updateEmail: currentUser.email,
    updateUsername: currentUser.username,
  });
  const [updatePassword, setUpdatePassword] = useState("");
  const { updateEmail, updateUsername } = updateLogin;

  const onLoginChange = (event) => {
    setUpdateLogin((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginUpdate = (e) => {
    e.preventDefault();

    if (updateEmail === currentUser.email) {
      if (updatePassword) {
        updateUser(dispatch, id, {
          username: updateUsername,
          password: updatePassword,
        });
      } else {
        updateUser(dispatch, id, {
          username: updateUsername,
        });
      }
    }

    if (updateUsername === currentUser.username) {
      if (updatePassword) {
        updateUser(dispatch, id, {
          email: updateEmail,
          password: updatePassword,
        });
      } else {
        updateUser(dispatch, id, {
          email: updateEmail,
        });
      }
    }

    if (
      updateEmail === currentUser.email &&
      updateUsername === currentUser.username
    ) {
      updateUser(dispatch, id, {
        password: updatePassword,
      });
    }

    if (!updatePassword) {
      updateUser(dispatch, id, {
        email: updateEmail,
        username: updateUsername,
      });
    } else {
      updateUser(dispatch, id, {
        email: updateEmail,
        username: updateUsername,
        password: updatePassword,
      });
    }
  };
  //=*=*=*=*=*=PERSONAL LOGIN DETAILS FORM=*=*=*=*=*=[END]//

  //[*][*][*][*][*]UPDATING USER'S PROFILE[*][*][*][*][*][END]//

  //[START]=*=*=*=*=*=SUCCESS UPDATE MODAL=*=*=*=*=*=//
  useEffect(() => {
    if (success) {
      if (which === "personal") {
        setEditOpen(3);
      } else if (which === "login") {
        setEditOpen(4);
      }
    }
  }, [success, which]);
  //=*=*=*=*=*=SUCCESS UPDATE MODAL=*=*=*=*=*=[END]//

  return (
    <Container>
      <Wrapper>
        <Left
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Title>MY DETAILS</Title>
          <Details>
            <SubTitle>PERSONAL INFORMATION</SubTitle>
            <Info>
              {currentUser.firstName} {currentUser.lastName}
            </Info>
            <Info>
              {currentUser.birthday !== ""
                ? moment(currentUser.birthday).format("MMM Do YY")
                : "BIRTHDAY"}
            </Info>
            <Info>{currentUser.gender}</Info>
            <Edit onClick={() => toggleEdit(1)}>EDIT</Edit>
          </Details>
          <LoginDetails>
            <SubTitle>LOGIN DETAILS</SubTitle>
            <MiniTitle>EMAIL</MiniTitle>
            <Info>{currentUser.email}</Info>
            <MiniTitle>USERNAME</MiniTitle>
            <Info>{currentUser.username}</Info>
            <MiniTitle>PASSWORD</MiniTitle>
            <Info>********</Info>
            <Edit onClick={() => toggleEdit(2)}>EDIT</Edit>
          </LoginDetails>
          <Manage>
            <MiniTitle>MANAGE ACCOUNT</MiniTitle>
            <Logout onClick={(e) => handleOut(e)}>
              LOG ME OUT <LogoutIcon />
            </Logout>
            <Warning>
              This will log you out from all web browsers you have used to
              access the Vibex website. To log in again, you'll have to enter
              your credentials.
            </Warning>
            <Delete
              onClick={() => {
                setWarningOpen(true);
              }}
            >
              DELETE MY ACCOUNT <BackspaceIcon />
            </Delete>
            <Warning>
              By deleting your account you will no longer have access to the
              information stored in your Vibex account such as order history or
              your wishlist.
            </Warning>
          </Manage>
        </Left>
        <Right>
          <ProfileSideBar />
        </Right>
      </Wrapper>
      <Modal
        open={warningOpen}
        onClose={() => setWarningOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <WarningPopUp
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <WarningTitle>
            Are you sure you want to delete your account?
          </WarningTitle>
          <Options>
            <Option
              className="bg-red-300 hover:bg-red-400 hover:text-red-200"
              onClick={handleDelete}
            >
              Yes
            </Option>
            <Option
              className="bg-green-300 hover:bg-green-400 hover:text-green-200"
              onClick={() => setWarningOpen(false)}
            >
              No
            </Option>
          </Options>
        </WarningPopUp>
      </Modal>
      {/* ---EDIT MODAL--- */}
      <Modal
        open={editOpen === 1}
        onClose={() => setEditOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <EditPopup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <EditTitle>PERSONAL INFORMATION</EditTitle>
          <EditForm>
            <EditSection>
              <EditLabel>First Name</EditLabel>
              <EditInput
                id="updateFirstName"
                name="updateFirstName"
                type="text"
                value={updateFirstName}
                onChange={(e) => {
                  onPersonalFormChange(e);
                }}
                className="capitalize"
                placeholder={currentUser.firstName}
              />
            </EditSection>
            <EditSection>
              <EditLabel>Last Name</EditLabel>
              <EditInput
                id="updateLastName"
                name="updateLastName"
                type="text"
                value={updateLastName}
                onChange={(e) => {
                  onPersonalFormChange(e);
                }}
                className="capitalize"
                placeholder={currentUser.lastName}
              />
            </EditSection>
            <EditSection>
              <EditLabel>Birthday</EditLabel>
              <EditInput
                id="updateBirthday"
                name="updateBirthday"
                value={updateBirthday}
                onChange={(e) => {
                  onPersonalFormChange(e);
                }}
                type="date"
              />
            </EditSection>
            <EditSection>
              <EditLabel>Gender</EditLabel>
              <EditInput
                id="updateGender"
                name="updateGender"
                type="text"
                value={updateGender}
                className="capitalize"
                onChange={(e) => {
                  onPersonalFormChange(e);
                }}
                placeholder={currentUser.gender}
              />
            </EditSection>
            {error && <Error>{error}</Error>}
            <Update
              type="submit"
              onClick={(e) => {
                handlePersonalUpdate(e);
                setWhich("personal");
              }}
            >
              Update
            </Update>
          </EditForm>
        </EditPopup>
      </Modal>
      <Modal
        open={editOpen === 2}
        onClose={() => setEditOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <EditPopup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <EditTitle>LOGIN DETAILS</EditTitle>
          <EditForm>
            <EditSection>
              <EditLabel>Email</EditLabel>
              <EditInput
                id="updateEmail"
                name="updateEmail"
                type="email"
                value={updateEmail}
                onChange={(e) => {
                  onLoginChange(e);
                }}
              />
            </EditSection>
            <EditSection>
              <EditLabel>username</EditLabel>
              <EditInput
                name="updateUsername"
                type="username"
                value={updateUsername}
                onChange={(e) => {
                  onLoginChange(e);
                }}
              />
            </EditSection>
            <EditSection>
              <EditLabel>password</EditLabel>
              <PasswordInput>
                <EditInput
                  type={passVis}
                  name="updatePassword"
                  placeholder="**********"
                  onChange={(e) => {
                    onLoginChange(e);
                    setUpdatePassword(e.target.value);
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
            </EditSection>
            {error && <Error>{error}</Error>}
            <Update
              type="submit"
              onClick={(e) => {
                handleLoginUpdate(e);
                setWhich("login");
              }}
            >
              Update
            </Update>
          </EditForm>
        </EditPopup>
      </Modal>
      <Modal
        open={editOpen === 3}
        onClose={() => setEditOpen(false)}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <SuccessMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Updated Successfully!
        </SuccessMessage>
      </Modal>
      <Modal
        open={editOpen === 4}
        onClose={(e) => {
          setEditOpen(false);
          handleOut(e);
        }}
        className="flex justify-center items-center backdrop-blur-sm"
      >
        <SuccessMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Updated Successfully!
          <LoginAgain>Please Login again...</LoginAgain>
        </SuccessMessage>
      </Modal>
      {isFetching && <Loading />}
      <AfterFooter />
    </Container>
  );
};

export default ProfilePage;
