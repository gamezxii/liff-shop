import axios from "axios";
import { urlApi } from "../urlapi";
import cookie from "js-cookie";
import { saveCookieCustomer, removeToken } from "@/utils/token";
import { NextRouter } from "next/router";
export enum authCustomerActiontype {
  LOADING_AUTH_CUSTOMER = "LOADING_AUTH_CUSTOMER",
  LOADING_AUTH_CUSTOMER_ERROR = "LOADING_AUTH_CUSTOMER_ERROR",
  LOADING_AUTH_CUSTOMER_SUCCESS = "LOADING_AUTH_CUSTOMER_SUCCESS",
  UPLOADING_AUTH_CUSTOMER = "UPLOADING_AUTH_CUSTOMER",
  UPLOADING_AUTH_CUSTOMER_ERROR = "UPLOADING_AUTH_CUSTOMER_ERROR",
  UPLOADING_AUTH_CUSTOMER_SUCCESS = "UPLOADING_AUTH_CUSTOMER_SUCCESS",
}

interface authCustomerActionInterface {
  type: authCustomerActiontype;
  payload: any;
}

interface Lineuser {
  liffId: string;
  email: string;
  fullName: string;
}

export const signinCustomer = (account: Lineuser, router: NextRouter) => {
  return async (dispatch) => {
    try {
      loadingAuth(dispatch);
      const signin = await axios.post(`${urlApi}customer`, { ...account });
      const { status, data } = await signin;
      if (status == 200) {
        saveCookieCustomer(data.customers);
        const customer = {
          id: data.customers._id,
          liffId: data.customers.liffId,
          fullName: data.customers.fullName,
        };
        loadingAuthSuccess(dispatch, customer);
        //router.reload();
      } else {
        loadingAuthError(dispatch, data.customers);
      }
    } catch (error) {
      loadingAuthError(dispatch, "User Not found or Password Invalid !");
    }
  };
};

export const signoutAdmin = (router: NextRouter) => {
  return async (dispatch) => {
    try {
      removeToken();
      loadingAuthSuccess(dispatch, null);
      router.push({ pathname: "/cms/signin" });
    } catch (error) {
      console.log(error);
    }
  };
};

const loadingAuth = (dispatch) => {
  const isLoadingAuth: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER,
    payload: null,
  };
  dispatch(isLoadingAuth);
};

const loadingAuthSuccess = (dispatch, payload) => {
  const isLoadingAuthSuccess: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingAuthSuccess);
};

const loadingAuthError = (dispatch, payload) => {
  const isLoadingAuthError: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER_ERROR,
    payload: payload,
  };
  dispatch(isLoadingAuthError);
};
