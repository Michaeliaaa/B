import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./components/home-page.component";
import AddReview from "./components/add-review.component";
import Review from "./components/review.component";
import ReviewsList from "./components/reviews-list.component";
import CurrencyRatesList from "./components/currencies-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            Module Reviews
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/reviews"} className="nav-link">
                Find Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Review
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/currencies"} className="nav-link">
                Check Currencies Rates
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/"} component={HomePage} />
            <Route exact path={"/reviews"} component={ReviewsList} />
            <Route exact path="/add" component={AddReview} />
            <Route path="/reviews/:id" component={Review} />
            <Route exact path="/currencies" component={CurrencyRatesList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
