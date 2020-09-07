class Api::V1::AccountsController < Api::V1::ApiController
    def profile
        @account = Account.find_by_username(params[:username])
        posts = @account.posts.active
        render :json => {
            :profile => @account.as_json(),
            :posts => posts.as_json()
        }
    end
end