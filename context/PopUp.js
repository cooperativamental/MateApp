import { createContext, useContext, useEffect, useState } from "react";
import ComponentButton from "../components/Elements/ComponentButton"
import PopUpElement from "../components/Elements/PopUp";

const PopUpContext = createContext({
    config: {
        title: "",
        text: "",
        onClick: null
    },
    handlePopUp: (config) => { }
});

const PopUpProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [time, setTime] = useState(4000)
    const [popUp, setPopUp] = useState({
        title: "",
        text: "",
        onClick: null,
    });

    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 4000);
    }, []);

    const handlePopUp = (config) => {
        setOpen(true)
        setPopUp(config)
    }

    return (
        <PopUpContext.Provider value={{ popUp, handlePopUp }}>
            {
                open &&
                <PopUpElement
                    onClick={
                        () => popUp?.onClick ?
                            (
                                popUp.onClick(),
                                setOpen(false)
                            )
                            :
                            setOpen(false)
                    }
                    title={popUp.title}
                    text={popUp.text}
                />
            }
            {children}
        </PopUpContext.Provider>
    );
};

const usePopUp = () => useContext(PopUpContext);

export { PopUpProvider, usePopUp };
