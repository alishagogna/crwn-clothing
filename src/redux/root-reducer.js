import { combineReducers} from 'redux';
import { persistReducer } from  'redux-persist';
import storage from 'redux-persist/lib/storage'; // use localstorage as default storage, alernatively we can also make use of session storage
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key:'root', //?
    storage,// what storage we are using
    whitelist: ['cart'] //what all reducer you want to store in localstorage
}

//code b4 using redux -persist
// export default combineReducers({
//     user: userReducer, //managed by firebase, no need to store in localstorage(persist it)
//     cart: cartReducer // persist this in localstorage
// })


//code aftr using redux -persist
const rootReducer = combineReducers({
    user: userReducer, //managed by firebase, no need to store in localstorage(persist it)
    cart: cartReducer, // persist this in localstorage
    directory:directoryReducer,
    shop:shopReducer,
})

export default persistReducer(persistConfig, rootReducer)