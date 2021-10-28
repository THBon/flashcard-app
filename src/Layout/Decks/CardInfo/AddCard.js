import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../../utils/api";


function AddCard() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })

    //Load deck 
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId])

    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        createCard(deck.id, formData);
        setFormData({
            front: "",
            back:""
        })
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="bi bi-house-door-fill">Home</i>
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to=" ">{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Add Card</h1>
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
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary btn-lg mr-3">Done</Link>
                <button type="submit" className="btn btn-primary btn-lg">Save</button>
            </form>
        </div>
    )
}

export default AddCard;