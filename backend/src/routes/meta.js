const express = require("express");
const pool = require("../db");
const router = express.Router;

router.get("/schemas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT schema_name
      FROM information_schema.schema
      ORDER BY schema_name
      `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/schemas/:schema/tables", async (req, res) => {
  const { schema } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = $1
      ORDER BY table_name
      `,
      [schema],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/tables/:schema/:table/columns", async (req, res) => {
  const { schema, table } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = $1 AND table_name = $2
      ORDER BY ordinal_position
    `,
      [schema, table],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
