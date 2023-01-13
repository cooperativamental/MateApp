import Head from "next/head"
import Layout from "../components/Layout";
import "../styles/globals.css";
import WalletContextProvider from "../context/WalletContext";
import { PopUpProvider } from "../context/PopUp";
import { Analytics } from '@vercel/analytics/react';

const MyApp = ({ Component, pageProps }) => {

  return (

    <WalletContextProvider>
      <PopUpProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </PopUpProvider>
    </WalletContextProvider>
  )


};

export default MyApp;
