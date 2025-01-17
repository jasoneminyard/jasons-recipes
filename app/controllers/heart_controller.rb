class HeartController < ApplicationController
  def beat
    render json: 'yes', status: 200
  end
end