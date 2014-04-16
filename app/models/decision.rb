class Decision < ActiveRecord::Base
  belongs_to :player
  belongs_to :food
end
