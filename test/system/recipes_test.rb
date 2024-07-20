require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase

  test "should visit the homepage" do
    visit "/"
  
    assert_selector "h1", text: HOME_HEADER_TEXT
  end

  test "should visit index when Recipes button is clicked" do
    visit "/"
    click_on VIEW_RECIPES_BUTTON_TEXT

    assert_selector "h1", text: RECIPES_INDEX_HEADER_TEXT
    assert_selector "a", text: HOME_BUTTON_TEXT
    assert_selector "a", text: CREATE_NEW_RECIPE_BUTTON_TEXT
    assert_selector "a", text: VIEW_RECIPE_BUTTON_TEXT
  end

  test "should visit each link and back from Recipes Index Page" do
    visit "/recipes"
    assert_selector "h1", text: "Recipes for every occasion"

    click_on HOME_BUTTON_TEXT
    assert_selector "a", text: VIEW_RECIPES_BUTTON_TEXT

    click_on VIEW_RECIPES_BUTTON_TEXT
    assert_selector "a", text: CREATE_NEW_RECIPE_BUTTON_TEXT

    click_on CREATE_NEW_RECIPE_BUTTON_TEXT
    assert_selector "a", text: "Back To Recipes"

    click_on "Back To Recipes"
    assert_selector "a", text: VIEW_RECIPE_BUTTON_TEXT

    click_on VIEW_RECIPE_BUTTON_TEXT
    assert_selector "a", text: "Back To Recipes"

    click_on "Back To Recipes"
    assert_selector "h1", text: "Recipes for every occasion"
  end
  
  test "should_create_new_recipe" do
    visit "/recipe"

    fill_in "Recipe Name", with: "Pink Lemonade"
    fill_in "Ingredients", with: "Pink Sugar, Lemons"
    fill_in "Instructions", with: "Mix them all together"

    assert_difference("Recipe.count") do
      click_on "Create Recipe"
      assert_selector "h1", text: "Pink Lemonade"
    end
  end

  test "should edit recipe" do
    recipe = Recipe.first
    visit "/recipes/#{recipe.id}"

    assert_selector "h1", text: recipe.name

    click_on "Edit Recipe"

    fill_in "Recipe Name", with: "Pink Lemonade"

    click_on "Update Recipe"

    assert_selector "h1", text: "Pink Lemonade"
  end
end
