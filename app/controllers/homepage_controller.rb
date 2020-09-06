class HomepageController < ApplicationController
  def index
    @posts = Post.active
  end
end
