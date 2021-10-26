import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const history = useHistory();
  
  //Empty form
  const formState = {
    name: "",
    description: ""
  };
  
  //Where save form date are stored
  const [formData, setFormData] = useState({...formState});
  
  //update deck on submit 
  const submitHandler = (event) => {
    event.preventDefault();
    createDeck(formData)
    .then((response) => {
      history.push(`/decks/${response.id}`)
    })
  };
  
  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: [target.value]
    });
  }
  
  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house-door-fill"></i>Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1 className="mb-4">Create Deck</h1>
      <form className="mb-5" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            required
            placeholder="Deck Name"
            value={formData.name}
            onChange={changeHandler}
            className="form-control"
            />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            id="description"
            required
            placeholder="Brief description of the deck"
            value={formData.description}
            name="description"
            onChange={changeHandler}
            className="form-control"
           />
        </div>
        <Link to ="/" className="btn btn-secondary btn-lg mr-3">Cancel</Link>
        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
    </div>
  )
}

export default CreateDeck;