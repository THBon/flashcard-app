import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api";

function EditDeck() {
    const history = useHistory();
    const [deck, setDeck] = useState({});
    
    //Define the value of the deck
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const { deckId } = useParams();

    //Use readDeck to load the respective deck based on deckId
    //Then set that deck into formData to display current state of that deck
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const getDeck = await readDeck(deckId, abortController.signal);
            setDeck(getDeck);
            setFormData({
                name: getDeck.name,
                description: getDeck.description,
                id: getDeck.id
            })
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }


    const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(formData).then((response) => history.push(`/decks/${response.id}`))
    }

    return(
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form className="mb-5" onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={changeHandler}
                        required
                        className="form-control"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        name="description" 
                        id="description"
                        value={formData.description}
                        onChange={changeHandler}
                        required
                        className="form-control"
                        rows="3"
                    />
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary btn-lg mr-3">Cancel</Link>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck;