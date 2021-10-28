import React, { useState, useEffect } from "react";
import { readDeck } from "../../../utils/api";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";

function Study() {
    const [deck, setDeck] = useState({});
    const {deckId } = useParams();

    //Load deck based on ID of the deck
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    },[deckId])

    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="bi bi-house-door-fill"> Home</i>
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to=" ">{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Study
                    </li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            <Card deck={deck}/>
        </div>
    )
};

export default Study;