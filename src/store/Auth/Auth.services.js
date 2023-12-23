import { get, post } from "src/helpers/api_helper";
import * as URL from "src/helpers/url_helper";

export const userLoginApi = (data) => post(URL.USER_LOGIN_URL, data);
export const userDetailsApi = (data) => get(URL.USER_DETAILS_URL, data);
export const userRegisterApi = (data) => post(URL.USER_REGISTER, data);
