const express = require("express");

const router = express.Router();

const { TB_Item } = require("../models");

// ----------------------------------------------------GET-ALL Items

router.get("/show", async (req, res) => {
  try {
    const items = await TB_Item.findAll();
    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------ADD Item(For Backend Only)

router.post("/insert", async (req, res) => {
  try {
    const item = req.body;
    await TB_Item.create(item);
    return res.status(200).json({ message: "Item Inserted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
