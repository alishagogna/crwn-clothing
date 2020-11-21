import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector }  from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component  {

  // remove auth session of users
  unsbuscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsbuscribeFromAuth =  auth.onAuthStateChanged(async userAuth =>{
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          console.log("user", snapShot.data());// snapshot object doesnt contain db data, to get it use data() method.
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
          console.log("this.state", this.state)
        }) 
      }
      setCurrentUser(userAuth)
    })
  }
  componentWillUnmount() {
    this.unsbuscribeFromAuth();
  }
  render() {
    const {currentUser} = this.props;
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/sign-in' render={()=>
            currentUser ? 
            (<Redirect to='/'/>) : 
            (<SignInAndSignUp />)}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
