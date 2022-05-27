import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
  deleteSuccess,
  deleteStart,
  deleteFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

//[=][=][=][=][=]***LOG-IN USER***[=][=][=][=][=]//
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

//[=][=][=][=][=]***REGISTERING USER***[=][=][=][=][=]//
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err.response.data));
  }
};

//[=][=][=][=][=]***DELETING USER***[=][=][=][=][=]//
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteSuccess(res));
  } catch (err) {
    dispatch(deleteFailure());
  }
};

//[=][=][=][=][=]***UPDATING USER***[=][=][=][=][=]//
export const updateUser = async (dispatch, id, user) => {
  dispatch(updateStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure(err.response.data));
  }
};
