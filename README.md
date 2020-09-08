# Aperture

## [Visit the site](https://salty-peak-38765.herokuapp.com/)

Aperture is a place for photographers to create, discover, and share visual photo portfolios.

Built for the Shopify backend challenge.

## Installation

Aperture uses AWS S3 for file uploads. Please update `config/application.yml` with AWS credentials before running the app.

The easiest way to run locally is using Docker Compose:
```bash
docker-compose up
```

----------------------------------------------------------------

Alternatively, to build from source:

### Prerequisites
* Ruby 2.7.1
* Rails 6.0.3
* [yarn](https://classic.yarnpkg.com/en/docs/install/)
* [PostgreSQL](https://www.postgresql.org/download/)
* [ImageMagick](https://imagemagick.org/script/download.php)

The following steps assume that all dependencies are present.

- Install packages

```bash
bundle install && yarn install
```

- Update `config/application.yml` with AWS credentials 
- Update `config/database.yml` with Postgres credentials

- Create and setup the database

```bash
rake db:create
rake db:migrate
```

- Start the Rails server

```bash
rails s
```

## Libraries/Technologies used
### Backend
* [Devise](https://github.com/heartcombo/devise) for user authentication
* **PostgreSQL** for database
* [Carrierwave](https://github.com/carrierwaveuploader/carrierwave) and [Fog](https://github.com/fog/fog) for uploads to AWS S3
* [MiniMagick](https://github.com/minimagick/minimagick) for image compression

### Frontend
* **React** and **TypeScript**
* [Reactstrap](https://reactstrap.github.io/) for styling
* [React-Rails](https://github.com/reactjs/react-rails)
* [React Dropzone](https://github.com/react-dropzone/react-dropzone) for drag & drop 
* [JustifiedGallery](https://miromannino.github.io/Justified-Gallery), [magnificPopup](https://dimsemenov.com/plugins/magnific-popup/) for gallery and lightbox

## Resources Used

This was my first time using Ruby and Ruby on Rails. I used the following resources in making this app:
* [Building a CRUD Interface - Pluralsight](https://www.pluralsight.com/guides/building-a-crud-interface-with-react-and-ruby-on-rails)
* [Rails Image Upload using Carrierwave and Devise - tutsplus](https://code.tutsplus.com/tutorials/rails-image-upload-using-carrierwave-and-devise--cms-25681)
* [Dropzone Integration with Carrierwave - GitHub Gist](https://gist.github.com/joemusacchia/fec89ea3360d5d7980b96e2bc6a39710)