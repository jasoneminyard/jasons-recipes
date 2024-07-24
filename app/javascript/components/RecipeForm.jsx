import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const RecipeForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", instruction: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (params.id) {
      const url = `/api/v1/recipes/${params.id}/edit`;
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setRecipe(response))
        .catch(() => navigate("/recipes"));
    }
  }, [params.id, navigate]);

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

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const id = params.id;
    const url = id ? `/api/v1/recipes/${id}` : `/api/v1/recipes`;

    const name = recipe.name;
    const ingredients = recipe.ingredients;
    const instruction = recipe.instruction;

    if (name.length === 0 || ingredients.length === 0 || instruction.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("recipe[name]", name);
    formData.append("recipe[ingredients]", ingredients);
    formData.append("recipe[instruction]", stripHtmlEntities(instruction));
    if (image) {
      formData.append("recipe[image]", image);
    }

    const method = id ? "PUT" : "POST";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": token,
      },
      body: formData,
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
            {params.id ? window.EDIT_RECIPE_FORM_TITLE_TEXT : window.CREATE_NEW_RECIPE_FORM_TEXT}
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">{window.RECIPE_FORM_NAME_FIELD}</label>
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
              <label htmlFor="recipeIngredients">{window.RECIPE_FORM_INGREDIENTS_FIELD}</label>
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
            <label htmlFor="instruction">{window.RECIPE_FORM_INSTRUCTIONS_FIELD}</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              value={recipe.instruction}
              onChange={handleInputChange}
            />
            <div className="form-group">
              <label htmlFor="recipeImage">{window.RECIPE_FORM_IMAGE_FIELD}</label>
              <input
                type="file"
                name="image"
                id="recipeImage"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              {params.id ? window.UPDATE_RECIPE_BUTTON_TEXT : window.CREATE_RECIPE_BUTTON_TEXT}
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

export default RecipeForm;
