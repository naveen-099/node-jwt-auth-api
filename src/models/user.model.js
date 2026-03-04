const { pool } = require('../config/db');

const User = {

  // Find a user by email
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  // Find a user by ID
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  // Create a new user
  async create({ name, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  },

  // Save a refresh token for a user
  async saveRefreshToken(userId, token) {
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)',
      [userId, token]
    );
  },

  // Find a refresh token
  async findRefreshToken(token) {
    const [rows] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = ? LIMIT 1',
      [token]
    );
    return rows[0] || null;
  },

  // Delete a refresh token (logout)
  async deleteRefreshToken(token) {
    await pool.query(
      'DELETE FROM refresh_tokens WHERE token = ?',
      [token]
    );
  },

};

module.exports = User;
