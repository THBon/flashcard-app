import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../../utils/api";
import Form from "./Form";


function AddCard() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })

    //Load deck based on deck's id
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId])

    //Handle values changes
    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    //Set card values when submited
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
            <Form changeHandler = { changeHandler } submitHandler = { submitHandler } deck = { deck } formData = { formData } />
        </div>
    )
}

export default AddCard;