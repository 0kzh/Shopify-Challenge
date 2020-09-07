class HomepageController < ApplicationController
  def index
    @posts = Post.active
    @view_profile_path = '/account/'
  end
end
