import { useState } from "react"
import { useEffect } from "react"
import InputSelect from "../../Elements/InputSelect"


const Agreement = ({ setProject, project, confirmInfoProject }) => {
    const [available, setAvailable] = useState()
    const [reserve, setReserve] = useState()

    useEffect(() => {
        setAvailable(((project?.totalBruto - project?.thirdParties?.amount) * (1 - (project.treasuryGroup / 100))) - (1 - (project?.reserve / 100)))

    }, [reserve])

    return (
        <div className="flex flex-col w-8/12 ">
            <div className="flex w-full justify-between items-center">
                <p>Available Budget (1)</p>
                <div className="flex items-center gap-4">
                    <InputSelect
                        disabled
                        value={available}
                        inputStyle="text-center"
                    />
                    <div>
                        <p>USDC</p>
                        <p>SOL</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-sm text-gray-100 whitespace-nowrap">Treasury rate</p>
                    <p className="text-xs text-[#3BB89F]">A slice of the project’s budget that will be assigned to your DAO Vault</p>
                </div>
                <div className="flex justify-center w-[4rem]">
                    <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
            </div>
        </div>
    )
}


export default Agreement