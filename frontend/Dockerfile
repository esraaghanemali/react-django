FROM node:20.12.2

WORKDIR /app

# Install pnpm
ARG PNPM_VERSION="9.0.5"
RUN npm install -g --no-optional pnpm@${PNPM_VERSION}

# TODO - build should be done in advance (in the CI) and we should just copy the dist
COPY . .
RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "run", "serve"]

# Expose port 4173.
EXPOSE 4173