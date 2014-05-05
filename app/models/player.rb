class Player < ActiveRecord::Base
  has_many :foods, through: :decisions
  has_many :decisions

  TOO_MANY_POINTS_MESSAGE = "YOU’RE ON THE RIGHT TRACK. Don’t Forget that a healthy diet is a balanced diet."
  TOO_FEW_POINTS_MESSAGE = "DON’T BE DISCOURAGED. Every Pro was once an amateur. You will be living healthy in no time"
  JUST_RIGHT_POINTS_MESSAGE = "YOU’RE A HEALTH GURU! You know a balanced diet does not mean a cookie in each hand"

  def coach_message
    if self.score_percentage > 60
      TOO_MANY_POINTS_MESSAGE
    elsif self.score_percentage < 40
      TOO_FEW_POINTS_MESSAGE
    else
      JUST_RIGHT_POINTS_MESSAGE
    end
  end

  def score_percentage
    (self.score.to_f / 1600.0) * 100.0
  end

  def score
    self.foods.inject(1600.0*0.5) {|sum, food| sum += food.point_value}
  end

  def to_s
    self.name
  end
end
