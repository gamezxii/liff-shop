import { authCustomerActiontype } from "@/actions/authCustomer.action";
import { HYDRATE } from "next-redux-wrapper";
import cookie from "js-cookie";

const getUser = cookie.get("customer")
  ? JSON.parse(cookie.get("customer"))
  : {};

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  user: getUser,
};

const authCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authCustomerReducer };
    case authCustomerActiontype.LOADING_AUTH_CUSTOMER:
      return { ...state, isLoading: true, isError: false, user: state.user };
    case authCustomerActiontype.LOADING_AUTH_CUSTOMER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.message,
        user: state.user,
      };
    case authCustomerActiontype.LOADING_AUTH_CUSTOMER_SUCCESS:
      const getUser = cookie.get("customer")
        ? JSON.parse(cookie.get("customer"))
        : {};
      return { ...state, isLoading: false, isError: false, user: getUser };

    default:
      return state;
  }
};

export default authCustomerReducer;
