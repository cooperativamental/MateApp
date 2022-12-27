import { Component, useState } from "react"
import { useEffect } from "react"
import ComponentButton from "../../Elements/ComponentButton"
import InputSelect from "../../Elements/InputSelect"


const Agreement = ({ setProject, project, confirmInfoProject }) => {
    const [available, setAvailable] = useState()
    const [nMembers, setNmembers] = useState()

    useEffect(() => {
        setAvailable(project.totalNeto * (1 - (project?.reserve / 100)))
    }, [project.reserve])

    const handleConfirm = () => {
        setProject({
            ...project,
            nMembers: nMembers,
            availableTeam: available
        })
        confirmInfoProject("AGREEMENT", true)
    }

    return (
        <div className="flex flex-col items-center w-8/12 p-4 gap-8">
            <div className="flex w-full justify-between items-center text-lg">
                <p>Available Budget (1)</p>
                <div className="flex items-center gap-4">
                    <InputSelect
                        disabled
                        value={available}
                        inputStyle="text-center"
                    />
                    <div>
                        <p className="text-2xl">$</p>
                    </div>
                </div>
            </div>
            {/* <div className="flex w-full items-center">
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
            </div> */}
            <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-lg text-gray-100 whitespace-nowrap">Members (n)</p>
                    <p className="text-xs text-[#3BB89F]">
                        How many partners are involved in the project.
                    </p>
                </div>
                <div className="w-full overflow-hidden rounded-md">

                    <button
                        onClick={() => {
                            setNmembers(1)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(2)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 2 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(3)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 3 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        3
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(4)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 4 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        4
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(5)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 5 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        5
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(6)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 6 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        6
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(7)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 7 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        7
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(8)
                        }}
                        className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 8 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        8
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(9)
                        }}
                        className={`relative  w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 9 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        9
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(10)
                        }}
                        className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 10 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        10
                    </button>
                </div>
            </div>

            <ComponentButton
                buttonText="Confirm Members"
                buttonEvent={handleConfirm}
                buttonStyle=""
            />
        </div>
    )
}

export default Agreement