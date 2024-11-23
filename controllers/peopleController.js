const catModel = require("../models/catModel");

const getCats = async (req, res) => {
  const cats = await catModel.getCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catModel.getCatById(id);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({ message: "Gato no encontrado" });
  }
};

const createCat = async (req, res) => {
  const createdCat = await catModel.createCat(req.body);
  if (createdCat) {
    res.json(createdCat);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateCat = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catModel.getCatById(id);
  if (cat) {
    const updatedCat = await catModel.updateCat(id, { ...cat, ...req.body });
    if (updatedCat) {
      res.json(updatedCat);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Gato no encontrado" });
  }
};

const deleteCat = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catModel.getCatById(id);
  if (cat) {
    const result = await catModel.deleteCat(id);
    if (result) {
      res.json(cat);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Gato no encontrado" });
  }
};

module.exports = {
  getCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
};
