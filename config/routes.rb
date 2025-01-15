Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes
    end
  end

  # # Mount ActiveStorage routes
  # mount ActiveStorage::Engine => '/rails/active_storage'

  # # Include ActiveStorage routes explicitly
  # direct :rails_blob do |model|
  #   ActiveStorage::Blob.routes(model)
  # end

  # direct :rails_blob do |blob|
  #   route_for(:rails_blob, blob)
  # end
  # direct :rails_blob_proxy do |blob|
  #   route_for(:rails_blob_proxy, blob)
  # end
  # direct :rails_disk_service do |disk|
  #   route_for(:rails_disk_service, disk)
  # end

  # direct :rails_blob_proxy_service do |proxy|
  #   route_for(:rails_blob_proxy_service, proxy)
  # end

  # # Define ActiveStorage routes here if not already included
  # get '/rails/active_storage/blobs/redirect/*path', to: 'active_storage/blobs#redirect'
  # get '/rails/active_storage/blobs/proxy/*path', to: 'active_storage/blobs#proxy'

  # Catch-all route (ensure it's at the bottom)
  get '*path', to: 'homepage#index', constraints: lambda { |req|
    req.format.html? && !req.path.start_with?('/rails/active_storage')
  }
end
