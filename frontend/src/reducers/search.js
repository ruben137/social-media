import {SEARCH_USER} from '../constants/actionTypes'

export const search= (results=[],action)=>{
  switch (action.type) {
    case SEARCH_USER:
      return action.payload
      default:
        return results
    }
  }
  