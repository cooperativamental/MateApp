import ComponentButton from "./ComponentButton"

const PopUpElement = ({ title, text, onClick }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 overflow-hidden flex flex-col justify-around  rounded-3xl h-20 w-60 bg-[#0f172a] text-white items-center ring-2 ring-white" >
            <h1 className="w-full text-2xl font-bold overflow-hidden">
                {title}
            </h1>
            <div className="flex w-full font-semibold text-md overflow-hidden text-clip">
                {text}
            </div>
        </div>
    )
}

export default PopUpElement