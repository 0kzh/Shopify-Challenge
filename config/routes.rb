Rails.application.routes.draw do
  devise_for :accounts

  get "/dashboard" => "accounts#index"

  resources :posts, only: [:index, :new, :create, :show]

  root 'homepage#index'
end