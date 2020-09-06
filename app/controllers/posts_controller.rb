class PostsController < ApplicationController
    
    def index
        posts = Post.all
        render :json => posts.to_json(:include => :account)
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.account_id = current_account.id if account_signed_in?

        if @post.save
            redirect_to dashboard_path, flash: { success: "Post was created successfully" }
        else
            redirect_to new_post_path, flash: { dangeR: "Error saving post" }
        end
    end

    private

    def post_params
        params.require(:post).permit(:image, :image_cache)
    end

end