import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from 'react-router-dom';
import Home from "./Decks/Home";
import CreateDeck from "./Decks/CreateDeck";
import Study from "./Decks/Study/Study";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
