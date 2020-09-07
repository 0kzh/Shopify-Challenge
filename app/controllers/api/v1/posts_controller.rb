class Api::V1::PostsController < Api::V1::ApiController
    def index
        posts = Post.all
        render :json => posts.to_json(:include => :account)
    end
end
