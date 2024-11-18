import { useEffect, useState } from "react";
import CostumeNavbar from './navbar';
import { Tablet } from "../tablet";
import Kartya from "./kartya";



export default function tabletTorles() {
    const [tablets, settablet] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");

    async function handleDeletePost(id: number) {
        await fetch(`http://localhost:3000/tablets/${id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            settablet(tablets.filter((tablets) => tablets.id !== id));
        })
        .catch((error) => {
            setError(error.message);
        });
    }

    useEffect(() => {
        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer("Resource not found (404)");
                }
                if (!response.ok) {
                    console.log("anyad");
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                settablet(data);
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
            <div className="mx-auto" style={{width:"fit-content"}}>
                <h2>Tabletek törlése</h2>
                <ul>
                    {tablets.map((tablet) => (
                        <div className="d-flex border">
                            {Kartya(tablet)}
                            <span className="me-2 mt-3" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeletePost(tablet.id)}>törlés</span>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
}
