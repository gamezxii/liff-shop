import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import logger from "redux-logger";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import Reducers from "./reducers";

/* export interface State {
    tick: string;
}
 */
const makeStore = () => createStore(Reducers, applyMiddleware(logger, thunk));
export const wrapper = createWrapper(makeStore, { debug: true });
