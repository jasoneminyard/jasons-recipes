Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes
    end
  end

  root "homepage#index"
  post :user_token, controller: :user_token, action: :create
  get 'heart/beat', controller: :heart, action: :beat

  # Catch-all route (ensure it's at the bottom)
  get '*path', to: 'homepage#index', constraints: lambda { |req|
    req.format.html? && !req.path.start_with?('/rails/active_storage')
  }
end
