
import { combineReducers } from 'redux';
import {posts }from './posts';

import {auth} from './auth'
import {userPosts }from './userPosts'
import {notifications} from './notifications'
import {user }from './user'
import {users }from './users'
import {search} from './search'

export const reducers = combineReducers({ postsState:posts ,auth,userPosts,notifications,userState:user,users,search})




