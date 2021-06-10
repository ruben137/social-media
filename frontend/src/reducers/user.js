import {GET_USER, UPDATE_DESCRIPTION,USER_NOT_FOUND,FOLLOW, FOLLOW_REQUEST} from '../constants/actionTypes'

export const user=(user=[],action)=>{
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_DESCRIPTION:
       return action.payload;
    case USER_NOT_FOUND:
      return {error:action.payload}
    case FOLLOW_REQUEST:
      return {...user,loading:true}
    case FOLLOW:
      return action.payload
      default:
        return user
        }
      }
  



    
  
  
