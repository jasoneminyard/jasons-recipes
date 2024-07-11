import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name:"", ingredients: "", instruction: "" });


  useEffect(() => {
    const url = `/api/v1/recipes/${params.id}/edit`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response from edit was not ok.");
      })
      .then((response) => 
        setRecipe(response)
    )
      .catch(() => navigate("/recipes"));
  }, [navigate, params.id]);

  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instruction, setInstruction] = useState(recipe.instruction);

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const updateRecipe = (key, value) => {
    setRecipe((previousRecipe) => ({ ...previousRecipe, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    updateRecipe(name, value);
  };

  const onSubmit = (event) => {
    const id = params.id;
    event.preventDefault();
    const url = `/api/v1/recipes/${id}`;

    const name = recipe.name;
    const ingredients = recipe.ingredients;
    const instruction = recipe.instruction;

    if (name.length === 0 || ingredients.length === 0 || instruction.length === 0){
        return
    }
    
    const body = {
      name,
      ingredients,
      instruction: stripHtmlEntities(instruction),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
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
      .then((response) => navigate(`/recipes/${params.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit this recipe.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                value={recipe.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                value={recipe.ingredients}
                onChange={handleInputChange}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              value={recipe.instruction}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn custom-button mt-3">
              Update Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;