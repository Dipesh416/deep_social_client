import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/auth.reducer";
import { thunk } from "redux-thunk"
import { PostReducer } from "./Post/post.reducer";
import { messageReducer } from "./Message/message.reducer";

const rootReducers = combineReducers({
auth:authReducer,
post:PostReducer, 
message:messageReducer,
})

export const store=legacy_createStore(rootReducers,applyMiddleware(thunk)) 