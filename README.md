# Blockchain and Wallet sample, fullstack system
A working sample of how blockchain, wallets and transactions work.
This FullStack Application uses NodeJs, Express, Encryption and React to build a Blockchain system based on proof of work.


## Prerequisites:

Have Redis installed on your PC on you can install Redis (needed for sending messages on the queues) in a Docker image running the following command line from the Docker console:

docker run -d --name my-redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest


## How to Run

1 - System Requirements:

- Docker
- NodeJs 

2 - Clone the repo and run the following command line on a shell:

- npm install
- npm run start
- the application is running at  http://localhost:3000
- Redis Insight is running at: http://localhost:8001

## Demo
Short demo showing making a transaction and retrieving the block created

![demo](https://github.com/davidebruno/blockchain-wallet-fullstack-sample/blob/main/client/src/assets/recording_transaction_blocks.gif)
