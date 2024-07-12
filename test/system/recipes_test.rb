require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit api_v1_recipes_url
  
    assert_selector "h1", text: "Recipes for every occasion"
  end
end
