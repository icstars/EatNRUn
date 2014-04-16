class CreateDecisions < ActiveRecord::Migration
  def change
    create_table :decisions do |t|
      t.belongs_to :player, index: true
      t.belongs_to :food, index: true

      t.timestamps
    end
  end
end
