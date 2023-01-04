import { useEffect, useState } from "react";


export const HostHook = () => {
    const [host, setHost] = useState({});

    useEffect(() => {
        setHost(window.location.host)
    }, []);

    return (
        host
    );
};