class FoodsController < ApplicationController
  before_action :set_food, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /foods
  def index
    @foods = Food.all
    respond_with @foods, callback: params[:callback]
  end

  # GET /foods/random
  def random
    @food = Food.order("RANDOM()").first
    respond_with @food, callback: params[:callback]
  end

  # GET /foods/1
  def show
    respond_with @food, callback: params[:callback]
  end


  # GET /foods/new
  def new
    @food = Food.new
    respond_with @food, callback: params[:callback]
  end

  # GET /foods/1/edit
  def edit
    respond_with @food, callback: params[:callback]
  end

  # POST /foods
  def create
    @food = Food.new(food_params)

    if @food.save
      flash[:notice] = 'Food was successfully created.'
    end
    respond_with @food, callback: params[:callback]
  end

  # PATCH/PUT /foods/1
  def update
    if @food.update(food_params)
      flash[:notice] = 'Food was successfully updated.'
    end
    respond_with @food, callback: params[:callback]
  end

  # DELETE /foods/1
  def destroy
    @food.destroy
    flash[:notice] = 'Food was successfully destroyed.'
    respond_with @food, callback: params[:callback]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food
      @food = Food.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_params
      params.require(:food).permit(:name, :point_value)
    end
end
