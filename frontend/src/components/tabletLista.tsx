import { useEffect, useState } from "react";
import { Tablet } from "../tablet";
import Kartya from "./kartya";
import CostumeNavbar from "./navbar";

export default function tabletLista() {
  const [tablets, settablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorServer, setErrorServer] = useState("");
  const [page, setPage] = useState(1);
  const [maxitems, setMaxitems] = useState(2);
  const [items, setItems] = useState<Tablet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Tablet;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/tablets");
        if (response.status === 404) {
          setErrorServer("Resource not found (404)");
        }
        if (!response.ok) {
          setErrorServer(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        settablets(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function Showdata() {
    setItems([]);
    const startIndex = (page - 1) * maxitems;
    const endIndex = Math.min(page * maxitems, tablets.length);
    const newItems = tablets.slice(startIndex, endIndex);
    setItems(newItems);
  }

  useEffect(() => {
    Showdata();
  }, [page, tablets, maxitems]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tablets.filter(
      (tablet) =>
        tablet.Nev.toLowerCase().includes(term) ||
        tablet.RAM.toString().includes(term) ||
        tablet.ar.toString().includes(term) ||
        tablet.kijelzoFelbontas.toLocaleLowerCase().includes(term) ||
        tablet.kijelzoMeret.toString().includes(term) ||
        tablet.opRendszer.toLocaleLowerCase().includes(term) ||
        tablet.procMagok.toString().includes(term) ||
        tablet.procOrajel.toString().includes(term)
    );
    setItems(filtered);
  };

  const sortTablets = (key: keyof Tablet, direction: "asc" | "desc") => {
    const sortedPhones = [...items].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setItems(sortedPhones);
    setSortConfig({ key, direction });
  };

  if (errorServer) {
    return <p>ErrorServer: {errorServer}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CostumeNavbar />
      <div>
        <h2>Tabletek</h2>
        <form>
          <label>
            Keresés:
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Márka, típus vagy ár alapján..."
            />
          </label>
        </form>
        <div>
          <label htmlFor="megjelen" className="me-1">
            Egy oldalon megjelenő tabletek száma:
          </label>
          <input
            type="number"
            name="megjelen"
            id="megjelen"
            value={maxitems}
            onChange={(e) => {
              setMaxitems(parseInt(e.currentTarget.value));
            }}
          />
        </div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col">
              Név
              <button
                onClick={() => sortTablets("Nev", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("Nev", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
              Operációs rendszer
              <button
                onClick={() => sortTablets("opRendszer", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("opRendszer", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
                Processzor órajele
              <button
                onClick={() => sortTablets("procOrajel", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("procOrajel", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
            Processzor magok száma
              <button
                onClick={() => sortTablets("procMagok", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("procMagok", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
            Kijelző Méret
              <button
                onClick={() => sortTablets("kijelzoMeret", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("kijelzoMeret", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
            Kijelző Felbontás
              <button
                onClick={() => sortTablets("kijelzoFelbontas", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("kijelzoFelbontas", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
            RAM
              <button
                onClick={() => sortTablets("RAM", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("RAM", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
            <div className="col">
            ÁR
              <button
                onClick={() => sortTablets("ar", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sortTablets("ar", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </div>
          </div>
          {items.map((tablet) => Kartya(tablet))}
        </div>
      </div>
      <div className="pagination mt-3">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Előző
        </button>
        <span>Oldal: {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(tablets.length / maxitems))
            )
          }
        >
          Következő
        </button>
      </div>
    </>
  );
}