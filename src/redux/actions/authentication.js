import {SET_CURRENT_USER} from "./actionTypes";

import instance from "./instance";

import decode from "jwt-decode";
import Cookies from "js-cookie";

import axios from "axios";


const setCurrentUser = (token) => {
  setAuthToken(token)
  const user = token ? decode(token) : null;
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}

const setAuthToken = token => {
    if(token){
      Cookies.set("token",token);
      instance.defaults.headers.Authorization = `jwt ${token}`
    }else{
      delete instance.defaults.headers.Authorization;
      Cookies.remove("token");
    }

}

export const login = (userData) => {
  return async dispatch => {
    try{
      const res = await instance.post("/login/", userData);
      const {token} = res.data;
      dispatch(setCurrentUser(token))
    }catch(err){
      console.error(err);
    }
  }
};

export const signup = (userData) => {
  return async dispatch => {
    try{
      const res = await instance.post("/signup/",userData);
      const {token} = res.data;
      dispatch(setCurrentUser(token));
    }catch(err){
      console.error(err.response.data);
    }
  }
};

export const logout = () =>
  setCurrentUser();
;

export const checkForExpiredToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;
    const user = decode(token);
    if(user.exp >= currentTimeInSeconds){
      return setCurrentUser(token);
    }
  }
  return setCurrentUser();
}
