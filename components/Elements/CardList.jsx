import Image from "next/image"
import { CalendarIcon, ChevronRightIcon, UsersIcon } from '@heroicons/react/20/solid'
import { useState } from "react"
import ComponentButton from "./ComponentButton"

export default function CardList({ list }) {
    const [namePartner, setNamePartner] = useState()

    if (!list?.length) {
        return (
            <div className="flex w-full justify-center text-white items-center">
                No results found
            </div>
        )
    } else {
        return (
            <div className="shadow w-full rounded-lg sm:rounded-md">
                <ul role="list" className="flex flex-col gap-4 ">
                    {
                        list?.map((item) => {
                            return (
                                <li
                                    onClick={() => item.redirect()}
                                    key={item.id}
                                    className="flex justify-between p-4 border-2 border-[#6221E8] rounded-md hover:bg-rose-color"
                                >
                                    <div className="truncate sm:w-3/12">
                                        <div className="flex text-lg">
                                            <p className="truncate font-medium text-white">{item.name}</p>
                                        </div>
                                    </div>
                                    <p className="flex overflow-hidden text-sm text-yellow-color transition-all duration-500 ">
                                        {item?.status}
                                    </p>

                                    <p className="flex text-white">
                                        Members: {item?.members?.length}
                                    </p>


                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

}
