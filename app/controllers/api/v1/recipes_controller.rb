class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy update edit]
  
  # app/assets/images/Sammy_Meal.jpg
  def index
    begin
      recipes = Recipe.all.order(created_at: :desc).map do |recipe|
        image_url = if recipe.image.attached?
                      url_for(recipe.image)
                    else
                      # Use only the filename here, not the full path
                      ActionController::Base.helpers.asset_path("Sammy_Meal.jpg")
                    end
        recipe.as_json.merge(image_url: image_url)
      end
      render json: recipes
    rescue => e
      logger.error "Error in fetching recipes: #{e.message}"
      render json: { error: e.message }, status: :internal_server_error
    end
  end
  
  
  
  
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
