import { useState } from "react"
import { useEffect } from "react"
import InputSelect from "../../Elements/InputSelect"


const Agreement = ({ setProject, project, confirmInfoProject }) => {
    const [available, setAvailable] = useState()
    const [nMembers, setNmembers] = useState()

    useEffect(() => {
        setAvailable(project.totalNeto * (1 - (project?.reserve / 100)))
    }, [project.reserve])



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
                    <p className="text-xs text-[#3BB89F]">
                        A slice of the project’s budget that will be assigned to your DAO Vault
                    </p>
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <InputSelect
                            type="number"
                            inputStyle="!rounded-lg !h-16 w-20"
                            name="reserve"
                            onChange={(e) => setProject({
                                ...project,
                                reserve: Number(e.target.value)
                            })}
                        />
                        <p className="text-4xl">%</p>
                    </div>
                    <p>USDC-SOL: {(project.totalNeto * project.reserve) / 100}</p>
                </div>
            </div>
            <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-sm text-gray-100 whitespace-nowrap">Members (n)</p>
                    <p className="text-xs text-[#3BB89F]">
                        How many partners are involved in the project.
                    </p>
                </div>
                <div className="overflow-hidden rounded-md">

                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        1
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        2
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        3
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        4
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        5
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        6
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        7
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        8
                    </button>
                    <button
                        className={`relative  w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        9
                    </button>
                    <button
                        className={`relative w-[10%] items-center border px-4 py-2 text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"} rounded-r-md`}
                    >
                        10
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Agreement