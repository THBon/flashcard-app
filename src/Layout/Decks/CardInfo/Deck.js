import React, { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../../../utils/api";
import CardList from "./CardList";



function Deck() {
  const [deck,setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();


  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);


  const deleteHandler = (deckId) => {
    if(window.confirm("Delete this deck? \n You will not be able to recover it.")) {
      deleteDeck(deckId);
      history.go("0")
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house-door-fill"></i>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div key= {deck.id} className="card mb-3">
        <div className="card-body">
          <div className="row-ml-1">
            <h5 className="card-title">{deck.name}</h5>
          </div>
          <p className="card-text text-seconddary">{deck.description}</p>
          <button onClick ={() => history.push(`${url}/edit`)} className="btn btn-secondary mr-2">Edit</button>
          <Link to = {`${url}/study`} className="btn btn-primary mr-2"><i className="bi bi-journal-bookmark"></i>Study</Link>
          <button onClick={() => history.push(`${url}/cards/new`)} className="btn btn-primary mr-5">Add Cards</button>
          <button onClick={() => deleteHandler(deck.id)} type="button" className="btn btn-danger ml-5">Delete</button>
        </div>
      </div>
      <CardList deck={deck} />
    </div>
  )
}

export default Deck;