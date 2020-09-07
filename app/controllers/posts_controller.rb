class PostsController < ApplicationController
    def new
        @post = Post.new
    end

    # def create
    #     @post = Post.new(post_params)
    #     @post.account_id = current_account.id if account_signed_in?

    #     if @post.save
    #         redirect_to dashboard_path, flash: { success: "Post was created successfully" }
    #     else
    #         redirect_to new_post_path, flash: { danger: "Error saving post" }
    #     end
    # end

    def create
        @post = Post.new
        @post.image = params['image']
        @post.account_id = current_account.id if account_signed_in?
        if @post.save
          render json: @post.to_json()
        end
    end
end