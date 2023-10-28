<h1 style="color: #38bdf8">Tweemoji</h1>

<div style="display: flex; align-items: center; justify-content: center">
    <img alt="Tweemoji Logo" height="200" src="public/logo.png" width="200"/>
</div>

Welcome to Tweemoji, a unique social media platform where you can express yourself using only emojis. This repository contains the source code for Tweemoji, which is built using Next.js, TypeScript, Clerk, Prisma, and tRPC.

Visit the live website: [Tweemoji](https://tweemoji-two.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)

## Features

- **Emoji-Only Posts**: Share your thoughts and feelings using emojis.
- **User Authentication**: Sign up and log in using Clerk.
- **Interactive Design**: A modern and user-friendly interface for an engaging experience.

## Technologies Used

- **[Next.js](https://nextjs.org)**: A React framework for building server-rendered React applications.
- **[TypeScript](https://typescriptlang.org)**: A statically typed superset of JavaScript for improved code quality.
- **[Clerk](https://clerk.dev)**: Handles user authentication and session management.
- **[Prisma](https://prisma.io)**: An ORM for database interactions, used for data storage.
- **[tRPC](https://trpc.io)**: For efficient data fetching and management.
- **[Tailwind CSS](https://tailwindcss.com)**: A utility-first CSS framework for building custom and responsive user interfaces with ease.

## Getting Started

Follow these steps to get the Tweemoji project up and running on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/tweemoji.git
   cd tweemoji
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open Tweemoji in your browser**:

   Visit [http://localhost:3000](http://localhost:3000) to explore the app locally.

## Configuration

Tweemoji relies on a few environment variables for configuration. You should create a `.env.local` file in the project root and add the following variables:

```
CLERK_PUBLIC_API_KEY=your_clerk_public_key
CLERK_FRONTEND_API_KEY=your_clerk_frontend_key
DATABASE_URL=your_database_url
```

Ensure that you have the Clerk and database setups ready for a seamless experience.

## Usage

1. Sign in with your GitHub account on Tweemoji.
2. Start posting emojis via the input at the top of the page.
3. Explore posts from other users, and visit their profiles to see all the posts they have made.