import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Layout>
      <Head>
        <meta name="apple-mobile-web-app-status-bar" content="#fff" />
        <link rel="apple-touch-icon" href="/images/icons/192.png" />
        <meta name="theme-color" content="#fff" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
    <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp);
