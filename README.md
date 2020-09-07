# Aperture

Aperture is a place for photographers to create, discover, and share visual photo portfolios.
Built for the Shopify backend challenge.

**Installation:**

Aperture depends on AWS S3 for file uploads. Demo keys have been provided, but in the future `app/config/application.yml` should be updated with your own keys. 

Using Docker Compose:
```bash
docker-compose up
```

----------------------------------------------------------------

Alternatively, to build from source:

### Prerequisites
* Ruby 2.7.1
* Rails 6.0.3
* yarn
* PostgreSQL
* MiniMagick

- Install packages

```bash
bundle install && yarn install
```

- Create and setup the database

```bash
rake db:create
rake db:migrate
```

- Start the Rails server

```bash
rails s
```

## Resources Used

This was my first time using Ruby and Ruby on Rails. I used the following resources in making this app:
* [Building a CRUD Interface - Pluralsight](https://www.pluralsight.com/guides/building-a-crud-interface-with-react-and-ruby-on-rails)
* [Rails Image Upload using Carrierwave and Devise - tutsplus](https://code.tutsplus.com/tutorials/rails-image-upload-using-carrierwave-and-devise--cms-25681)
* [Dropzone Integration with Carrierwave - GitHub Gist](https://gist.github.com/joemusacchia/fec89ea3360d5d7980b96e2bc6a39710)


## Building and Deploying

```bash
poetry run task build-staging
```

```bash
poetry run task build-production
```


will authenticate into ECR with credentials from AWS CLI, and build/push the image to ECR. `build-staging` will push to staging, `build-production` will push to production.