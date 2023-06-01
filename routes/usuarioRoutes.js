import express from 'express'
import { registrar, autenticar, perfil } from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'
import authAdmin from '../middleware/authAdmin.js'

const router = express.Router();

router.post('/', registrar);

// Autentica las credenciales, luego su tipo de usuario.
router.post('/login', autenticar, (req, res) => {
    // Si se llega aquí, el usuario ha sido autenticado y es un administrador o usuario normal.
    if (req.esAdmin) {
        // Si el usuario autenticado es un administrador, dirige a la ruta correspondiente para administradores.
        return res.json(req.usuario);
    } else {
        return res.json(req.usuario);
    }
});

router.get('/perfil', checkAuth, perfil);
export default router