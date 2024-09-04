const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para mostrar el formulario de agregar usuario
router.get('/add', (req, res) => {
    res.render('add-user');
});

// Ruta para procesar el formulario de agregar usuario
router.post('/add', (req, res) => {
    const { name, phone, email } = req.body;
    const sql = 'INSERT INTO users (name, phone, email) VALUES (?, ?, ?)';
    db.query(sql, [name, phone, email], (err) => {
        if (err) throw err;
        res.redirect('/users'); // Redirige a la lista de usuarios después de agregar
    });
});

// Ruta para mostrar el formulario de edición de usuario
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.render('edit-user', { user: results[0] });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    });
});

// Ruta para procesar el formulario de edición de usuario
router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const sql = 'UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?';
    db.query(sql, [name, phone, email, id], (err) => {
        if (err) throw err;
        res.redirect('/users'); // Redirige a la lista de usuarios después de editar
    });
});

// Ruta para eliminar un usuario
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.redirect('/users'); // Redirige a la lista de usuarios después de eliminar
    });
});

// Ruta para listar usuarios
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('list-users', { users: results });
    });
});

module.exports = router;
