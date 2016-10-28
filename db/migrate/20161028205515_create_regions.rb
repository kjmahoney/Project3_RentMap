class CreateRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :regions do |t|
      t.integer :zip
      t.integer :rent
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end
