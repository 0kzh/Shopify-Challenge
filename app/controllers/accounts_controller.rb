class AccountsController < ApplicationController
    def index
        # user feed
        @posts = Post.active
    end

    def show
        # user profile
    end
end
