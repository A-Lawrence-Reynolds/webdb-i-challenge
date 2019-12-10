const express = require("express");

const knex = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
  knex("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ error: "failed to get posts" });
    });
});

server.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ error: "failed to get account" });
    });
});

server.post("/accounts", (req, res) => {
  knex
    .insert(req.body)
    .into("accounts")
    .then(newAcc => {
      res.status(201).json(newAcc);
    })
    .catch(error => {
      res.status(500).json({ error: "failed to make account" });
    });
});
server.put("/:id", (req, res) => {
  const id = req.params.id;
  knex("accounts")
    .where({ id: id })
    .update(req.body)
    .then(upDAcc => {
      res.status(201).json(upDAcc);
    })
    .catch(error => {
      res.status(500).json({ error: "failed to update  account" });
    });
});
server.delete("/:id", (req, res) => {
  const id = req.params.id;
  knex("accounts")
    .where({ id: id })
    .del()
    .then(delAcc => {
      res.status(201).json(delAcc);
    })
    .catch(error => {
      res.status(500).json({ error: "failed to delete account" });
    });
});
module.exports = server;
