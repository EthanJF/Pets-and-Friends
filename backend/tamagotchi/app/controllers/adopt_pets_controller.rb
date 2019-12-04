class AdoptPetsController < ApplicationController

  def create
    adopt_pet = AdoptPet.create(adopt_params)
  end

  def destroy
    adopt_pet = AdoptPet.find(params[:id])
    adopt_pet.destroy
  end


  private

  def adopt_params
      params.permit(:user_id, :pet_id)
  end

end
