const express = require("express");

const router = express.Router();

const { TB_OrderCart } = require("../models");

// ----------------------------------------------------Fetch All Items from Added List

router.get("/show/", async (req, res) => {
  try {
    const data = await TB_OrderCart.findAll();
    res.send(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------ADD Item into List

router.post("/insert", async (req, res) => {
  try {
    const items = req.body;
    await TB_OrderCart.create(items);
    return res.status(200).json({ message: "Item Inserted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Update Item from list

router.patch("/update/:id", async (req, res) => {
  try {
    const  id = req.params.id;

    const record = await TB_OrderCart.update({ ItemQuantity: req.body.ItemQuantity,TotalPrice:req.body.TotalPrice },{where: { id: id }});
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Delete Item from list

router.delete("/deleteOne/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record=await TB_OrderCart.destroy({ where: { id: id } });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Item Deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Fetch only Item Prices

router.get("/showTotalPrice", async (req, res) => {
  try {
    const data = await TB_OrderCart.findAll({ attributes: ["TotalPrice"] });
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Clear Items When order is confirm 

router.delete("/delete", async (req, res) => {
  try {
    await TB_OrderCart.destroy({ where: {} });
    return res.status(200).json({ message: "successfully Clear All Items!!" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
