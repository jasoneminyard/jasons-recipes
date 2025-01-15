class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy update edit]
  
  def index
    recipes = Recipe.all.order(created_at: :desc).map do |recipe|
      recipe.as_json.merge(image_url: recipe.image.attached? ? url_for(recipe.image) : nil)
    end
    render json: recipes
  end
  

  # def create
  #   recipe = Recipe.create!(recipe_params)
  #   if recipe
  #     render json: recipe
  #   else
  #     render json: recipe.errors
  #   end
  # end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      # render json: recipe, status: :created
      render json: recipe.as_json.merge(image_url: recipe.image.attached? ? url_for(recipe.image) : nil), status: :created
    else
      # render json: recipe.errors, status: :unprocessable_entity
      render json: { error: recipe.errors.full_messages }, status: :unprocessable_entity    end
  end

  def edit
    if @recipe
      render json: @recipe.as_json.merge(image_url: @recipe.image.attached? ? url_for(@recipe.image) : nil)
    else
      render json: { message: 'Edit failed to find recipe!' }, status: :not_found
    end
  end  


  def show
    # render json: @recipe
    render json: @recipe.as_json.merge(image_url: @recipe.image.attached? ? url_for(@recipe.image) : nil)
  end

  def destroy
    @recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  # def update
  #   recipe = @recipe.update(recipe_params)
  #   if recipe
  #     render json: @recipe
  #   else
  #     render json: @recipe.errors
  #   end
  # end

  def update
    if @recipe.update(recipe_params)
      # render json: @recipe
      updated_recipe = @recipe.as_json.merge(image_url: @recipe.image.attached? ? url_for(@recipe.image) : nil)
      render json: updated_recipe, status: :ok
    else
      # render json: @recipe.errors, status: :unprocessable_entity
      render json: { error: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

    private

      def recipe_params
        params.require(:recipe).permit(:id, :name, :ingredients, :instruction, :image)
      end

      def set_recipe
        @recipe = Recipe.find(params[:id])
      end
end
