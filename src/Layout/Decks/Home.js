import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import { deleteDeck } from "../../utils/api";

function Home() {
  const [deckList, setDeckList] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    listDecks().then(setDeckList);
  }, []);
  
  const deleteHandler = (deckId) => {
    if(window.confirm("Delete this deck?/n/You will not be able to recover it.")) {
      deleteDeck(deckId);
      history.go(0);
    }
  }
  
  
  const table = deckList.map((deck) => {
    return (
      <div key = { deck.id } className="card">
        <div className="card-body">
          <div className = "row ml-1">
            <h5 className="card-title mr-5">{deck.name}</h5>
            <p className = "text-secondary">{deck.cards.length} cards</p>
          </div>
          <p className="card-text text-secondary">{deck.description}</p>
          <Link to={`/decks/${deck.id}`} className="btn btn-primary mr-2"><i className="bi bi-eye"></i>View</Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-5"><i className="bi bi-journal-bookmark"></i>Study</Link>
          <button onClick= {() => deleteHandler(deck.id)} type="button" className="btn btn-danger ml-5">Delete<i className="fas fa-trash-o"></i></button>
        </div>
      </div>
    );
  });
  
  return (
    <section>
      <Link to="./decks/new" className="btn btn-secondary mb-2">
        <i className="fa fa-plus-lg"></i>
        Create Deck
      </Link>
      {table}
    </section>
  )
};


export default Home;