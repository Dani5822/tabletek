import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tablets",
  })
  .promise();

app.get("/tablets", async (req, res) => {
  try {
    const temp = await db.query("SELECT * FROM tablets");
    const rows = temp[0];
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error retrieving posts: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tablets", async (req, res) => {
  try {
    let postData = req.body;
    const [rows] = await db.query(
      "INSERT INTO `tablets` (`Nev`, `opRendszer`, `procOrajel`, `procMagok`, `kijelzoMeret`, `kijelzoFelbontas`, `RAM`, `leiras`, `ar`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [postData.Nev,postData.opRendszer,postData.procOrajel,postData.procMagok,postData.kijelzoMeret,postData.kijelzoFelbontas,postData.RAM,postData.leiras,postData.ar]
    );
    res.status(200).json({ message: "Tablet was successfully added!" });
  } catch (error) {
    console.error(`Error adding tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tablets/:tabletId", async (req, res) => {
  try {
    let tabletId = parseInt(req.params.tabletId);
    const [rows] = await db.query("DELETE FROM tablets WHERE id = ?", [tabletId]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "Tablet not found" });
    } else {
      res.status(200).json({ message: "Tablet was successfully removed" });
    }
  } catch (error) {
    console.error(`Error deleting tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/tablets/:id', async (req, res) => {
  try {
    let tabletId = parseInt(req.params.id);
    const [rows] = await db.query('SELECT id, title, content, create_at FROM tablets WHERE id = ?', [tabletId]);
    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Tablet not found' });
    }
  } catch (error) {
    console.error(`Error retrieving tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
