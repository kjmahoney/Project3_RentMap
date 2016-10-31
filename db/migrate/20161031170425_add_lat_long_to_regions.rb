class AddLatLongToRegions < ActiveRecord::Migration[5.0]
  def change
    add_column :regions, :lat, :decimal 
    add_column :regions, :long, :decimal
  end
end
