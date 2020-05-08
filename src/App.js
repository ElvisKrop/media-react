import React, { useEffect } from "react";
import Header from "./components/header";
import ArticlePage from "./pages/articlePage";
import SignInUp from "./pages/signInUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "./redux-store";

// fake userdata for testing
const mockUser = {
  bio: null,
  createdAt: "2020-05-08T11:26:37.165Z",
  email: "new_human@mail.com",
  id: 96259,
  image: null,
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTYyNTksInVzZXJuYW1lIjoiTmV3IEh1bWFuIiwiZXhwIjoxNTk0MTIxMTk3fQ.IQqST95iW4Ez3ddzKauLDFgTs1KK5u0fW2ORTOVzSkE",
  updatedAt: "2020-05-08T11:26:37.170Z",
  username: "New Human"
};

const App = ({ user, userLoaded }) => {
  useEffect(() => {
    userLoaded(mockUser);
  }, [userLoaded]);

  //TODO class container should be in each component
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/article/:slug"
            render={({ match }) => <ArticlePage slug={match.params.slug} />}
          />
          <Route path="/login" component={SignInUp} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  userLoaded: (user) => dispatch(Actions.userLoaded(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
