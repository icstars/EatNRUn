# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140414175747) do

  create_table "decisions", force: true do |t|
    t.integer  "player_id"
    t.integer  "food_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "decisions", ["food_id"], name: "index_decisions_on_food_id"
  add_index "decisions", ["player_id"], name: "index_decisions_on_player_id"

  create_table "foods", force: true do |t|
    t.string   "name"
    t.integer  "point_value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", force: true do |t|
    t.integer  "avatar_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
