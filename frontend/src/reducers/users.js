import { GET_USERS } from "../constants/actionTypes";

export const users=(users=[],action)=>{
  switch(action.type){
    case GET_USERS:
      return action.payload
    default:
      return users
  }
}