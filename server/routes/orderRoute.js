const express = require("express");
const router = express.Router();
const { TB_Order } = require("../models");
const { Op } = require("sequelize");

// ----------------------------------------------------GET-ALL Orders

router.get("/show", async (req, res) => {
  try {
    const data = await TB_Order.findAll();
    res.send(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});


// ----------------------------------------------------ADD Order

router.post("/insert", async (req, res) => {
  try {
    const order = req.body;
    await TB_Order.create(order);
    res.json(order);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------GET-ONE record For Update

router.get("/getOne/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TB_Order.findAll({ where: { id: id } });
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Update Order Detail

router.patch("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customerDetails = req.body;
    const record=await TB_Order.update(customerDetails, { where: { id: id } });

    if (!record) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order Updated successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------DELETE Order

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record=await TB_Order.destroy({ where: { id: id } });

    if (!record) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order Deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ----------------------------------------------------Search Order By OrderId and CustomerName

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const order = await TB_Order.findAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: `%${query}%`, 
            },
          },
          {
            CustomerName: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });

    res.json(order);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
