import { Tablet } from "../tablet";

export default function Kartya(tablet: Tablet) {
  return (
    <>
      <div className="row row-cols-9 border border-dark">
        <div className="col"><strong>Név: </strong>{tablet.Nev}</div>
        <div className="col"><strong>Operációs rendszer:</strong> {tablet.opRendszer}</div>
        <div className="col"><strong>Processzor órajele:</strong> {tablet.procOrajel}</div>
        <div className="col"><strong>Processzor magok száma:</strong> {tablet.procMagok}</div>
        <div className="col"><strong>Kijelző Méret:</strong> {tablet.kijelzoMeret}</div>
        <div className="col"><strong>Kijelző Felbontás:</strong> {tablet.kijelzoFelbontas}</div>
        <div className="col"><strong>RAM:</strong> {tablet.RAM}</div>
        <div className="col-5"><strong>Leírás:</strong> {tablet.leiras}</div>
        <div className="col"><strong>ÁR:</strong> {tablet.ar}</div>
      </div>
    </>
  );
}
