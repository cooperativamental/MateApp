import { useEffect, useState } from "react"
import { useRouter } from "next/router";

import Navbar from "./Navbar";

import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const Layout = ({ children }) => {

  const router = useRouter()
  const paths = ['/register', '/', '/resetPass', '/pay/[...slug]'];

  const { connection } = useConnection()
  const { publicKey } = useWallet()

  return (
    <div className="bg-[#131128] h-screen w-screen ">
      <Navbar />
      <main className={`overflow-y-auto py-8 flex h-[calc(100vh_-_4rem)] justify-center scrollbar`} >
        {children}
      </main>
    </div>
  );
};

export default Layout;
