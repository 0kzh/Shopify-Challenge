FROM ruby:2.7.1

# Fetch yarn
RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y nodejs yarn postgresql-client imagemagick

RUN mkdir /app
WORKDIR /app
COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY package.json .
COPY yarn.lock .
RUN yarn install --check-files

COPY . /app

# Clear existing server.pid
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Starts the main process
CMD ["rails", "server", "-b", "0.0.0.0"]