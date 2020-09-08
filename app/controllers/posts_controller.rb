class PostsController < ApplicationController
    before_action :authenticate_account!, only: [:new] 

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.account_id = current_account.id if account_signed_in?
        if @post.save
            render json: @post, status: :created, location: @post
        else
            head :unprocessable_entity
        end
      end

    private

    def post_params
        params.require(:post).permit(:image, :image_cache)
    end
end