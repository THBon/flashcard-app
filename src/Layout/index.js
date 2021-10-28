import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from 'react-router-dom';
import Home from "./Decks/Home";
import CreateDeck from "./Decks/CreateDeck";
import Study from "./Decks/Study/Study";
import Deck from "./Decks/CardInfo/Deck";
import EditDeck from "./Decks/CardInfo/EditDeck";
import EditCard from "./Decks/CardInfo/EditCard";
import AddCard from "./Decks/CardInfo/AddCard";


//The central area for all navigations throughout the app
function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/">
            <Home />
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
