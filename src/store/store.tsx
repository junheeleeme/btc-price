import { combineReducers, createStore } from "redux";
import crypto from ".";

const rootReducer = combineReducers({
  crypto,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
