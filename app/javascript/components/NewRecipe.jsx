import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes";

    if (name.length === 0 || ingredients.length === 0 || instruction.length === 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: stripHtmlEntities(instruction),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/recipes/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form id="recipeForm" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">{window.RECIPE_FORM_NAME_FIELD}</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">{window.RECIPE_FORM_INGREDIENTS_FIELD}</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                onChange={(event) => onChange(event, setIngredients)}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">{window.RECIPE_FORM_INSTRUCTIONS_FIELD}</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={(event) => onChange(event, setInstruction)}
            />
            <button id="submit" type="submit" className="btn custom-button mt-3">
              {window.CREATE_RECIPE_BUTTON_TEXT}
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              {window.BACK_TO_RECIPES_BUTTON_TEXT}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;