class RemoveImageFromRecipe < ActiveRecord::Migration[7.0]
    def change
        remove_column :recipes, :image, :string, default: 'https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg'
    end
end
  