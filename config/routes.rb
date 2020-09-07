Rails.application.routes.draw do
  devise_for :accounts

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index]
      resources :accounts, only: [:profile]
      get "/account/:username" => "accounts#profile" 
    end
  end
  
  get "/account/:username" => "accounts#profile", as: :profile
  resources :posts, only: [:new, :create, :show]

  root 'site#index'
end