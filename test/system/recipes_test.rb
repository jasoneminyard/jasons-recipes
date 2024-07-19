require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase

  test "visiting the homepage" do
    visit "/"
  
    assert_selector "h1", text: "Food Recipes"
  end

  test "visiting the index" do
    visit "/recipes"
  
    assert_selector "h1", text: "Recipes for every occasion"
  end
end
