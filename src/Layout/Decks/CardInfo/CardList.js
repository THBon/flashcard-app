import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../../../utils/api";


function CardList({ deck }) {
    const history = useHistory();

    const deleteHandler = (cardId) => {
        if(window.confirm("Delete this cared? \n You will not be able to recover it.")) {
            deleteCard(cardId);
            history.go(0)
        }
    }
    
    /*If there are cards inside the deck,
    map them out with requested layout.
    To do: optimize the layout between back/front*/ 
    if(deck.cards && deck.cards.length > 0) {
        const { cards } = deck;

        const cardList = cards.map((card) => {
            return (
                <div key={card.id} className="row">
                    <div className="col col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{card.front}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{card.back}</p>
                                <button
                                    type="button"
                                    onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}
                                    className="btn btn-secondary"
                                >Edit</button>
                                <button
                                    type="button"
                                    onClick={() => deleteHandler(card.id)}
                                    className="btn btn-danger"
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <h1>Cards</h1>
                {cardList}
            </div>
        )
    }
    return null;
}

export default CardList;