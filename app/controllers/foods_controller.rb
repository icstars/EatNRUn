class FoodsController < ApplicationController
  before_action :set_food, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /foods
  def index
    @foods = Food.all
    respond_with @foods
  end

  def random
    @food = Food.order("RANDOM()").first
    respond_with @food
  end

  # GET /foods/1
  def show
    respond_with @food
  end


  # GET /foods/new
  def new
    @food = Food.new
  end

  # GET /foods/1/edit
  def edit
  end

  # POST /foods
  def create
    @food = Food.new(food_params)

    if @food.save
      redirect_to @food, notice: 'Food was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /foods/1
  def update
    if @food.update(food_params)
      redirect_to @food, notice: 'Food was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /foods/1
  def destroy
    @food.destroy
    redirect_to foods_url, notice: 'Food was successfully destroyed.'
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
