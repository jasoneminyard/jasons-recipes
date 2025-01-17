# app/controllers/user_token_controller.rb
class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token, raise: false
end