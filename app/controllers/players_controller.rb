class PlayersController < ApplicationController
  before_action :set_player, except: [:index, :new, :create]
  respond_to :html, :json

  # GET /players
  def index
    @players = Player.all
    respond_with @players, callback: params[:callback]
  end

  # GET /players/1
  def show
    respond_with @player, callback: params[:callback]
  end

  def coach_message
    results = {message: @player.coach_message}
    respond_with results, callback: params[:callback]
  end

  # GET /players/new
  def new
    @player = Player.new
    respond_with @player, callback: params[:callback]
  end

  # GET /players/1/edit
  def edit
    respond_with @player, callback: params[:callback]
  end

  # POST /players
  def create
    @player = Player.new(player_params)

    if @player.save
      flash[:notice] = 'Player was successfully created.'
    end
    respond_with @player, callback: params[:callback]
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      flash[:notice] = 'Player was successfully updated.'
    end
    respond_with @player, callback: params[:callback]
  end

  # DELETE /players/1
  def destroy
    @player.destroy
    flash[:notice] = 'Player was successfully destroyed.'
    respond_with @player, callback: params[:callback]
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_player
    @player = Player.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def player_params
    params.require(:player).permit(:avatar_id, :name)
  end
end
