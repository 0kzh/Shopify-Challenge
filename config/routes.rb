Rails.application.routes.draw do
  devise_for :accounts

  get "/dashboard" => "accounts#index"
  get "/account/:username" => "accounts#profile", as: :profile

  resources :posts, only: [:index, :new, :create, :show]

  root 'homepage#index'
end