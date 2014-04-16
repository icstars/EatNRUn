class Player < ActiveRecord::Base
  has_many :decisions

  def to_s
    self.name
  end
end
