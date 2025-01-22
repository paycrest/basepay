# Basepay ![image](https://github.com/paycrest/zap/assets/87664239/152fa090-fea7-4553-ba98-1fd3bf9cb4b9)

[![Next.js](https://img.shields.io/badge/-Next.js-61DAFB?logo=Next.js&logoColor=white&color=11172a)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-FFA500?logo=TypeScript&logoColor=4678c8&color=11172a)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=Tailwind%20CSS&logoColor=60bdfa&color=11172a)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/-Biome-1d2b34?logo=Biome&logoColor=71a5fc&color=11172a)](https://biomejs.dev/)

Basepay is an app developed for the [Based Africa Hackathon](https://devfolio.co/projects/basepay-df80).

Using Basepay, anyone can generate unique "linked addresses" -- onchain representations of their bank or mobile money accounts. These linked addresses enable anyone to receive stablecoins and have them automatically settled as local currency in their traditional financial accounts, seamlessly bridging the gap between decentralized and traditional finance.

Get your linked address here [basepay.link](https://www.basepay.link)

![image](https://based-africa.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fb95da37a3a1a4fb9adb82d7d9f6d80e9%2Fassets%2Fcover%2F733.png&w=1440&q=100)

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository:

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

- [Basenames](https://base.org/names)
- [Coinbase Smart Wallet](https://www.smartwallet.dev) for gasless transactions
- [Paycrest Protocol](https://paycrest.io) for decentralized payments

## Contributing

We welcome contributions to Basepay! To get started, follow these steps: 

**Important:** Before you begin contributing, please ensure you've read and understood these important documents:

- [Contribution Guide](https://paycrest.notion.site/Contribution-Guide-1602482d45a2809a8930e6ad565c906a) - Critical information about development process, standards, and guidelines.

- [Code of Conduct](https://paycrest.notion.site/Contributor-Code-of-Conduct-1602482d45a2806bab75fd314b381f4c) - Our community standards and expectations.

Our team will review your pull request and work with you to get it merged into the main branch of the repository.

If you encounter any issues or have questions, feel free to open an issue on the repository or leave a message in our [developer community on Telegram](https://t.me/+Stx-wLOdj49iNDM0)

## Disclaimer Notice

This application is for demo use only. Any transactions conducted within this app are for illustrative purposes.

Therefore:

While the app records real transactions, please exercise caution and do not use this app as is in a production environment. Use at your own risk. The developers are not responsible for any issues or damages that may arise from the use of this app.
