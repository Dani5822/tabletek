import { useEffect, useState } from "react";
import { Tablet } from "../tablet";
import Kartya from "./kartya";
import CostumeNavbar from './navbar';

export default function tabletLista() {
    const [tablets, setPosts] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer("Resource not found (404)");
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (errorServer) {
        return <p>Error: {errorServer}</p>
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <CostumeNavbar/>
            <div>
                <h2>Tabletek</h2>
                <ul>
                    {tablets.map((tablet) => (
                        Kartya(tablet)
                    ))}
                </ul>
            </div>
        </>
    );
}
