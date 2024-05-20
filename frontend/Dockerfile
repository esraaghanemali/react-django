FROM ubuntu:22.04

# to run apt without interative dialogue (e.g. tzdata package)
ARG DEBIAN_FRONTEND="noninteractive"
ENV GO111MODULE=on
ARG BIN="/usr/local/bin"
ENV PATH="$PATH:/usr/bin:/usr/local/bin"

RUN apt-get update && \
    apt-get install -y git bash adduser make curl unzip gnupg xz-utils build-essential gettext-base bc lsb-release osslsigncode \
    # See here for Cypress dependencies: https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libasound2 libgconf-2-4 libnss3 libxss1 libxtst6 xauth xvfb && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Node
# Checksum source: https://nodejs.org/en/blog/release/v20.12.0
# renovate: datasource=github-release-attachments depName=nodejs/node versioning=regex:^(v)?(?<major>[0-9].*)
ARG NODE_VERSION="v20.12.2"
ARG NODE_CHECKSUM=f8f9b6877778ed2d5f920a5bd853f0f8a8be1c42f6d448c763a95625cbbb4b0d

# Install pnpm
# renovate: datasource=github-tags depName=nodejs/node versioning=regex:^(v)?(?<major>[0-9].*)
ARG PNPM_VERSION="v9.0.5"
RUN curl https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz -o /tmp/node.tar.gz && \
    echo "$NODE_CHECKSUM /tmp/node.tar.gz" | sha256sum --check - && \
    tar -xzf /tmp/node.tar.gz -C /usr/ --strip-components 1 && \
    rm -rf /tmp/* /var/tmp/* && \
    export PNPM_VERSION_FIXED=$(echo ${PNPM_VERSION} | sed 's/v//') && \
    npm install -g --no-optional pnpm@${PNPM_VERSION_FIXED}

# TODO - build should be done in advance and we should just copy the dist
COPY . .
RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "run", "serve", "--", "--host", "0.0.0.0"]

# Expose port 4173.
EXPOSE 4173