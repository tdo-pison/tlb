# tlb

> A GitHub App built with [Probot](https://github.com/probot/probot) that task list bot

## Setup

```sh
# Install dependencies
npm install
yarn install

# if you use yarn

# build step because TypeScript
npm build
yarn build



# Run the bot
npm start
yarn start
```

## Docker

```sh
# 1. Build container
docker build -t tlb .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> tlb
```

## Contributing

If you have suggestions for how tlb could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Tony Do <tonyttdo@gmail.com>
