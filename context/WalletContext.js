import { useMemo } from "react"; 
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as Web3 from "@solana/web3.js";

import * as WalletAdapterWallets from "@solana/wallet-adapter-wallets";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function WalletContextProvider({ children }) {
  const endpoint = ["devnet", "mainnet", "testnet"].includes(process.env.NEXT_PUBLIC_NETWORK) ? Web3.clusterApiUrl(process.env.NEXT_PUBLIC_NETWORK) : process.env.NEXT_PUBLIC_NETWORK ?? Web3.clusterApiUrl("devnet");
  const wallets = useMemo(
    () => [
      new WalletAdapterWallets.PhantomWalletAdapter(),
      new WalletAdapterWallets.SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
