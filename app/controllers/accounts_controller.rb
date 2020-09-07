class AccountsController < ApplicationController
    before_action :set_account, only: [:profile, :profile_data]
    def index
        # user feed
        @posts = Post.active
    end
    
    def profile
        # user profile
        @posts = Post.find_by_account_id(params[:id]) 
    end

    def set_account
        @account = Account.find_by_username(params[:username])
    end
end
