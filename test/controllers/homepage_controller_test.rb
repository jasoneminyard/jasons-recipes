require "test_helper"

class HomepageControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do # this just passes thru to empty erb files
    get root_url
    assert_response :success # all responses are json and :success

    get "/*path"
    assert_response :success # all responses are json and :success
  end
end