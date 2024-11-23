const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "catdb",  // Cambié el nombre de la base de datos
  connectionLimit: 5,
});

// Obtener todos los gatos
const getCats = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, breed, character, fur_color FROM cats"
    );
    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

// Obtener un gato por su ID
const getCatById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, breed, character, fur_color FROM cats WHERE id=?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

// Crear un nuevo gato
const createCat = async (cat) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO cats(breed, character, fur_color) VALUE(?, ?, ?)`,
      [cat.breed, cat.character, cat.fur_color]
    );
    return { id: parseInt(response.insertId), ...cat };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

// Actualizar un gato existente
const updateCat = async (id, cat) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE cats SET breed=?, character=?, fur_color=? WHERE id=?`,
      [cat.breed, cat.character, cat.fur_color, id]
    );
    return { id, ...cat };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

// Eliminar un gato
const deleteCat = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM cats WHERE id=?", [id]);
    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

module.exports = {
  getCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
};
