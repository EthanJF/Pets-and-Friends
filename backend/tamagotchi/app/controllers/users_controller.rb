class UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.create(user_params)
  end


  private

  def user_params
      params.require(:pet).permit(:name, :password_digest)
  end

end
