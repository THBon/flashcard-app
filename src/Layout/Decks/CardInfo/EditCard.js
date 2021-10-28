import React, {useEffect, useState} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {readCard, updateCard, readDeck } from "../../../utils/api";


function EditCard() {
    const history = useHistory();
    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    });
    const { deckId, cardId } = useParams();

    //

    useEffect(() => {
        readDeck(deckId).then(setDeck);
        readCard(cardId).then(setFormData)        
    }, [deckId, cardId])

    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        updateCard(formData);
        history.push(`/decks/${deck.id}`)
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="bi bi-house-door-fill"></i>Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to=" ">Deck {deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <form className="mb-5" onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="front" className="form-label font-weight-bold">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        value= {formData.front}
                        onChange={changeHandler}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="back" className="form-label font-weight-bold">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        value= {formData.back}
                        onChange={changeHandler}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary btn-lg mr-3">Cancel</Link>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    )
}

export default EditCard;