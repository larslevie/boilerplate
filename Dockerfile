FROM node:10.3.0-alpine
LABEL Lars Levie <lars@levieindustries.com>

RUN apk --update --no-cache add \
  nginx \
  curl

RUN mkdir -p /run/nginx

ENV \
  CONSUL_TEMPLATE_VERSION='0.19.4' \
  CONTAINERPILOT='/code/etc/containerpilot.json5.gotmpl' \
  CONTAINERPILOT_VERSION='3.8.0'

RUN \
  curl -fLsS https://releases.hashicorp.com/consul-template/$CONSUL_TEMPLATE_VERSION/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.tgz | \
  tar xz -C /usr/local/bin && \
  curl -fLsS https://github.com/joyent/containerpilot/releases/download/$CONTAINERPILOT_VERSION/containerpilot-$CONTAINERPILOT_VERSION.tar.gz | \
  tar xz -C /usr/local/bin

WORKDIR /code

COPY package.json ./
RUN npm install --no-save

COPY .eslintrc.js stylelint.config.js ./
COPY webpack.common.js webpack.prod.js ./
COPY bin/build.sh bin/
COPY src src

RUN bin/build.sh

COPY webpack.dev.js ./
COPY bin bin
COPY etc etc

ENV \
  URL='http://localhost' \
  CONSUL_SERVICE_NAME='boilerplate'

EXPOSE 80

CMD ["/usr/local/bin/containerpilot"]
