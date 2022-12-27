import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Mate from "/public/mate.js"

const Navbar = () => {
  const router = useRouter()
  const { connection } = useConnection()
  const { publicKey } = useWallet()


  return (

    <nav className="flex relative p-6 items-center justify-between bg-box-color w-full h-[4rem] z-10">
      <Mate onClick={()=>router.push("/")}/>
      <WalletMultiButton className='!h-full !w-max !bg-[#FA9972] hover:!bg-slate-700 !rounded-3xl !font-thin'/>
    </nav>

  )
}

export default Navbar