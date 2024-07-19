require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase

  test "should visit the homepage" do
    visit "/"
  
    assert_selector "h1", text: "Food Recipes"
  end

  test "should visit index when Recipes button is clicked" do
    visit "/"
    click_on "Recipes"

    assert_selector "h1", text: "Recipes for every occasion"
    assert_selector "a", text: "Home"
    assert_selector "a", text: "Create New Recipe"
    assert_selector "a", text: "View Recipe"
  end

  test "should visit each link and back from Recipes Index Page" do
    visit "/recipes"
    assert_selector "h1", text: "Recipes for every occasion"

    click_on "Home"
    assert_selector "a", text: "Recipes"

    click_on "Recipes"
    assert_selector "a", text: "Create New Recipe"

    click_on "Create New Recipe"
    assert_selector "a", text: "Back To Recipes"

    click_on "Back To Recipes"
    assert_selector "a", text: "View Recipe"

    click_on "View Recipe"
    assert_selector "a", text: "Back To Recipes"

    click_on "Back To Recipes"
    assert_selector "h1", text: "Recipes for every occasion"
  end
  
end
