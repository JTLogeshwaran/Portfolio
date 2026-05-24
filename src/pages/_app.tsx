import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Logeshwaran J T | Electronics & Computer Engineering</title>
        <meta name="description" content="Portfolio of Logeshwaran J T, an Electronics & Computer Engineering student at Sona College of Technology, specializing in embedded systems, IoT, and software development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph / Social SEO */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Logeshwaran J T | Electronics & Computer Engineering" />
        <meta property="og:description" content="Engineering smart embedded systems, IoT optimizations, and performance-focused software applications." />
        <meta property="og:image" content="/profile_avatar.png?v=6" />
        
        {/* Custom SVG Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><defs><linearGradient id='logo-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%233b82f6' /><stop offset='50%25' stop-color='%236366f1' /><stop offset='100%25' stop-color='%23a855f7' /></linearGradient></defs><polygon points='50,5 90,25 90,75 50,95 10,75 10,25' stroke='url(%23logo-grad)' stroke-width='6' fill='%2303050c' stroke-linejoin='round'/><path d='M 35 25 L 35 70 L 65 70' stroke='url(%23logo-grad)' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/><path d='M 25 35 L 35 35' stroke='%233b82f6' stroke-width='3' stroke-linecap='round'/><path d='M 35 50 L 50 50 L 60 60' stroke='%23a855f7' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='35' cy='25' r='5' fill='%236366f1'/><circle cx='65' cy='70' r='5' fill='%23a855f7'/><circle cx='25' cy='35' r='3.5' fill='%233b82f6'/><circle cx='60' cy='60' r='3.5' fill='%23a855f7'/></svg>" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
