class Food < ActiveRecord::Base
  has_many :decisions
end
