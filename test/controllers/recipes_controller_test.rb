require "test_helper"

class RecipesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get api_v1_recipes_url
    assert_response :success
  end

  test "should create recipe" do
    assert_difference("Recipe.count") do
      post api_v1_recipes_url, 
        params: {  
          name: "chocolate milk", 
          ingredients: "chocolate syrup, milk",
          instruction: "mix the ingredients in a glass"
        }
    end

    assert_response :success
  end

  test "should show recipe" do
    get api_v1_recipe_url(@recipe)
    assert_response :success
  end

  # test "should get edit" do
  #   get api_v1_edit_recipe_url(@recipe)
  #   assert_response :success
  # end

  # test "should update recipe" do
  #   patch recipe_url(@recipe), params: { recipe: {  } }
  #   assert_redirected_to recipe_url(@recipe)
  # end

  test "should destroy recipe" do
    assert_difference("Recipe.count", -1) do
      delete api_v1_recipe_url(@recipe)
    end

    assert_response :success
  end
end
