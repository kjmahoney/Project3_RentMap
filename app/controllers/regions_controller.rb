class RegionsController < ApplicationController
  def index
    @regions = Region.all

  respond_to do |format|
     format.html { render :index }
     format.json { render json: @regions }
  end
end
end
