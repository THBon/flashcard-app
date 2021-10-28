import React, {useEffect, useState} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {readCard, updateCard, readDeck } from "../../../utils/api";
import Form from "./Form";

function EditCard() {
    const history = useHistory();
    const [deck, setDeck] = useState({})

    //Define the object values of a card
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    });
    const { deckId, cardId } = useParams();

    //Set the deck based on the deck's Id
    //Then load the card of that deck based on the card's Id

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
            <Form changeHandler = { changeHandler } submitHandler = { submitHandler } deck = { deck } formData = { formData } />
        </div>
    )
}

export default EditCard;