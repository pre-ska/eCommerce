import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //onAuthStateChanged automatrski vraća unsubscriber funkciju
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // ako se neko logirao...neću log of provjeravat
      if (userAuth) {
        // provjerim dali je korsinik već postojeći u mojoj DB
        // funkcija vrati referencu na taj dokument
        const userRef = await createUserProfileDocument(userAuth);

        // postojao taj doc ili ne, ja se pretplatim na promjene u snapshotu i odma snimim prvo stanje
        userRef.onSnapshot(snapShot => {
          // moram koristiti metodu data() da bi u biti dobio stvarne podatke iz snapshota
          // ali unutar samo dokumenta nemam ID...koristim ID od snapshota, i sve unutar dokumenta spredam
          // this.setState({
          //   currentUser: { id: snapShot.id, ...snapShot.data() }
          // });
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatch)(App);
