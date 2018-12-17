import { commentReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
 

  comment:commentReducer,

 
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));