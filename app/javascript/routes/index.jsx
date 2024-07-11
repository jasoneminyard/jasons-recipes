import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/recipe" element={<NewRecipe />} />
      <Route path="/recipes/:id/edit" element={<EditRecipe />} />
    </Routes>
  </Router>
);