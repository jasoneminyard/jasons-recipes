import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Recipe = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({ ingredients: "", image_url: "" });

    useEffect(() => {
        const url = `/api/v1/recipes/${params.id}`;
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => setRecipe(response))
          .catch(() => navigate("/recipes"));
      }, [navigate, params.id]);

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    const deleteRecipe = () => {
        const url = `/api/v1/recipes/${params.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(() => navigate("/recipes"))
          .catch((error) => console.log(error.message));
    };

    const ingredientList = () => {
        let ingredientList = "No ingredients available";
    
        if (recipe.ingredients.length > 0) {
          ingredientList = recipe.ingredients
            .split(",")
            .map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ));
        }
    
        return ingredientList;
    };

    const recipeInstruction = addHtmlEntities(recipe.instruction);

    return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <img
              src={recipe.image_url || window.NO_PHOTO_PLACEHOLDER_ADDRESS}
              alt={`${recipe.name}`}
              className="img-fluid position-absolute"
            />
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {recipe.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12 col-lg-3">
                <ul className="list-group">
                  <h5 className="mb-2">Ingredients</h5>
                  {ingredientList()}
                </ul>
              </div>
              <div className="col-sm-12 col-lg-7">
                <h5 className="mb-2">Preparation Instructions</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${recipeInstruction}`,
                  }}
                />
              </div>
              <div className="col-sm-12 col-lg-2 d-flex flex-column align-items-end mb-3">
                <Link to={`/recipes/${recipe.id}/edit`} className="btn custom-button mb-2">
                  {window.EDIT_RECIPE_BUTTON_TEXT}
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteRecipe}
                >
                  {window.DELETE_RECIPE_BUTTON_TEXT}
                </button>
              </div>
            </div>
            <Link to="/recipes" className="btn btn-link">
              {window.BACK_TO_RECIPES_BUTTON_TEXT}
            </Link>
          </div>
        </div>
    );
};

export default Recipe;
