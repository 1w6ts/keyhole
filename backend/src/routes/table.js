const express = require("express");
const pool = require("../db");
const router = express.Router();

const MAX_LIMIT = 1000;

router.get("/tables/:schema/:table/rows", async (req, res) => {
  const { schema, table } = req.params;
  const limit = Math.min(Number(req.query.limit) || 100, MAX_LIMIT);
  const offset = Number(req.query.offset) || 0;

  try {
    const result = await pool.query(
      `SELECT * FROM "${schema}"."${table}" LIMIT $1 OFFSET $2`,
      [limit, offset],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
