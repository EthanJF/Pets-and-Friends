class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  
  has_many :pets, through: :adopt_pets
end


