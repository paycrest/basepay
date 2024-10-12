# Basepay ![image](https://github.com/paycrest/zap/assets/87664239/152fa090-fea7-4553-ba98-1fd3bf9cb4b9)

[![Next.js](https://img.shields.io/badge/-Next.js-61DAFB?logo=Next.js&logoColor=white&color=11172a)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-FFA500?logo=TypeScript&logoColor=4678c8&color=11172a)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=Tailwind%20CSS&logoColor=60bdfa&color=11172a)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/-Biome-1d2b34?logo=Biome&logoColor=71a5fc&color=11172a)](https://biomejs.dev/)

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository and switch to the waitlist branch:

   ```bash
   git clone https://github.com/paycrest/basepay.git
   cd basepay
   ```

2. Configure environment variables:

   - Copy the [`env.example`](.env.example) file to `.env.local`

     ```bash
     cp .env.example .env.local
     ```

   - Add the required environment variables.

3. Install dependencies and start the development server:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Visit [localhost:3000](http://localhost:3000) to view the waitlist page locally.

## Major Technologies Used

- [OnchainKit](https://docs.base.org/docs/basenames-tutorial-with-onchainkit/) to resolve basenames
- [Coinbase wallet](https://www.coinbase.com/wallet/smart-wallet) for smart wallet integration

## Disclaimer Notice

This application is for demo use only. Any transactions conducted within this app are for illustrative purposes.

Therefore:

While the app records real transactions, please exercise caution and do not use this app as is in a production environment. Use at your own risk. The developers are not responsible for any issues or damages that may arise from the use of this app.
