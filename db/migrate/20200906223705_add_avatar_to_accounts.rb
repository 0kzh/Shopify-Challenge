class AddAvatarToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :avatar, :string
  end
end
