FROM node:argon

RUN useradd -ms /bin/bash maxime -u 1000
USER maxime

# Create app directory
RUN mkdir -p /data
WORKDIR /data

# Install app dependencies
COPY . /data
RUN chown -R maxime:maxime /data
RUN npm install

ENTRYPOINT [ "npm" ]
