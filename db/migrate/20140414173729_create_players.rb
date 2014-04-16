class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :avatar_id
      t.string :name

      t.timestamps
    end
  end
end
