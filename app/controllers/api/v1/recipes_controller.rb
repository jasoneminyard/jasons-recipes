class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy update edit]
  
  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def edit
    if @recipe
      render json: @recipe
    else
      render json: { message: 'Edit failed to find recipe!' }
    end
  end

  def show
    render json: @recipe
  end

  def destroy
    @recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  def update
    recipe = @recipe.update(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

    private

      def recipe_params
        params.require(:recipe).permit(:id, :name, :image, :ingredients, :instruction)
      end

      def set_recipe
        @recipe = Recipe.find(params[:id])
      end
end
