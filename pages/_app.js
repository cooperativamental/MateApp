import Head from "next/head"
import Layout from "../components/Layout";
import { HostProvider } from "../context/host";
import "../styles/globals.css";
import WalletContextProvider from "../context/WalletContext";
import { PopUpProvider } from "../context/PopUp";

const MyApp = ({ Component, pageProps }) => {

  return (

    <WalletContextProvider>
      <HostProvider>
        <PopUpProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PopUpProvider>
      </HostProvider>
    </WalletContextProvider>
  )


};

export default MyApp;
