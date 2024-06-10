import { useEffect, useState } from "react";

const useClass = () => {
    const [Class1, setClass] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                setClass(data);
                setLoading(false);
            });
    }, [])
    return [Class1, loading]
}

export default useClass;