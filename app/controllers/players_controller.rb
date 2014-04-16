class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /players
  def index
    @players = Player.all
    respond_with @players
  end

  # GET /players/1
  def show
    respond_with @player
  end

  # GET /players/new
  def new
    @player = Player.new
    respond_with @player
  end

  # GET /players/1/edit
  def edit
    respond_with @player
  end

  # POST /players
  def create
    @player = Player.new(player_params)

    if @player.save
      flash[:notice] = 'Player was successfully created.'
    end
    respond_with @player
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      flash[:notice] = 'Player was successfully updated.'
    end
    respond_with @player
  end

  # DELETE /players/1
  def destroy
    @player.destroy
    flash[:notice] = 'Player was successfully destroyed.'
    respond_with @player
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
