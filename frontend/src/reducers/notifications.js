import { DELETE_NOTIFICATION, NEW_NOTIFICATION, GET_NOTIFICATIONS,DELETE_MESSAGE_NOTIFICATION} from "../constants/actionTypes";

export const notifications=(notifications=[],action)=>{
  switch (action.type) {
    case 
      GET_NOTIFICATIONS:
      return action.payload
      case DELETE_NOTIFICATION:
      return notifications.filter(notification=>notification._id!==action.payload)
      case DELETE_MESSAGE_NOTIFICATION:
       return notifications.filter(notification=>notification.notificationId!==action.payload)
 case 
      NEW_NOTIFICATION:
    return [...notifications]
    default:
      return notifications
    }
  }


  