class ApplicationController < ActionController::API
  include Knock::AuthTokenController

  # With the below line, we have current_user available in all actions
  before_action :authenticate_user

  # Since this is an API-only application, we want to skip the CSRF protection.
  skip_before_action :verify_authenticity_token, raise: false
end
