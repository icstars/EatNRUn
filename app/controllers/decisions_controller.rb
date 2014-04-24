class DecisionsController < ApplicationController
  before_action :set_decision, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /decisions
  def index
    @decisions = Decision.all
    respond_with @decisions, callback: params[:callback]
  end

  # GET /decisions/1
  def show
    respond_with @decision, callback: params[:callback]
  end

  # GET /decisions/new
  def new
    @decision = Decision.new
    respond_with @decision, callback: params[:callback]
  end

  # GET /decisions/1/edit
  def edit
    respond_with @decision, callback: params[:callback]
  end

  # POST /decisions
  def create
    @decision = Decision.new(decision_params)

    if @decision.save
      flash[:notice] = 'Decision was successfully created.'
    end
    respond_with @decision, callback: params[:callback]
  end

  # PATCH/PUT /decisions/1
  def update
    if @decision.update(decision_params)
      flash[:notice] = 'Decision was successfully updated.'
    end
    respond_with @decision, callback: params[:callback]
  end

  # DELETE /decisions/1
  def destroy
    @decision.destroy
    flash[:notice] = 'Decision was successfully destroyed.'
    respond_with @decision, callback: params[:callback]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_decision
      @decision = Decision.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def decision_params
      params.require(:decision).permit(:player_id, :food_id)
    end
end
