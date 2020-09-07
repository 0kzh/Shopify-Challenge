class HomepageController < ApplicationController
  def index
    @posts = Post.active
    @view_profile_path = current_account ? profile_path(current_account.username) : new_session_path('account')
  end
end
