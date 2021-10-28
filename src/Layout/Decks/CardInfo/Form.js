import React from "react";
import { Link } from "react-router-dom";


//Form function act as a component for both AddCard and EditCard component
function Form({ changeHandler, submitHandler, deck, formData }) {
    return (
        <div>
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

export default Form;