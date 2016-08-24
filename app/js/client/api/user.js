import axios from "axios";
import * as Config from "../utils/api.js";

export const authenticateUser = (userInfo) => {
  const { email, password } = userInfo;
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/user/session",
        data : {
          email: email,
          password: password,
          remember_me: true
        }
      }, Config.APIConfig
    )
  );
};

export const checkUser = (userInfo) => {
  const { email, password } = userInfo;
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/user/register",
        data : {
          email: email,
          password: password
        }
      }, Config.APIConfig
    )
  );

};

export const registerUser = (userInfo) => {
  console.log("--------------");
  console.log(userInfo);
  const { email, password, mobile, address, city, state, zip } = userInfo;

  //Check if user exists

  return axios(
    Object.assign(
      {
        method: "post",
        url: "/pzly01live7/_table/user_profile",
        data : {
          email: email,
          password: password,
          mobile: mobile,
          address: address,
          city: city,
          state: state,
          zip: zip,
          timestamp: "2016-05-03 04:00:00"
        }
      }, Config.APIConfig
    )
  );
};

export const signOutUser = () => {

};