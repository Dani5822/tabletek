import { Tablet } from "../tablet";

export default function Kartya(tablet: Tablet) {
    
    return (
        <div className="container mt-4">
                <tr>
                  <strong><td style={{width:"fit-content"}}>Név: <br/>{tablet.Nev}</td></strong>
                  <td>Operációs rendszer: {tablet.opRendszer}</td>
                  <td>Processzor órajele:{tablet.procOrajel}</td>
                  <td>Processzor magok száma: {tablet.procMagok}</td>
                  <td>Kijelző Méret {tablet.kijelzoMeret}</td>
                  <td>Kijelző Felbontás {tablet.kijelzoFelbontas}</td>
                  <td>RAM: {tablet.RAM}</td>
                  <td>Leírás: {tablet.leiras}</td>
                  <td>ÁR: {tablet.ar}</td>
                </tr>
              
        </div>
      );
}


