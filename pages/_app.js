import '../styles/globals.css'
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import Head from 'next/head';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';


require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Head>
            <title>Friends Of Dionysus | The NFT-funded winery</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <meta property="og:title" content="Friends Of Dionysus" />
            <meta property="og:site_name" content="The NFT winery" />
            <meta property="og:url" content="https://get.friendsofdionysus.com" />
            <meta
              property="og:description"
              content="Our vision is inspired by a simple desire: we want to create a sincere and sustainable community by building a real-life winery in Italy."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://friendsofdionysus.com/wp-content/uploads/2022/02/Preview-3.png"
            />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@fofdionysus" />
            <meta name="twitter:title" content="Friends Of Dionysus | The NFT-funded winery" />
            <meta name="twitter:description" content="Our vision is inspired by a simple desire: we want to create a sincere and sustainable community by building a real-life winery in Italy." />
            <meta name="twitter:image" content="https://friendsofdionysus.com/wp-content/uploads/2022/02/Preview-3.png"></meta>

            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff"></meta>

          </Head>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
