const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/FilmeController")

router.get('/', Controller.buscarFilmes)
router.get('/:id', Controller.buscarFilmesPorId)
router.post('/adicionar', Controller.criarFilme)
router.put('/editar/:id', Controller.atualizarFilme)
router.delete('/deletar/:id', Controller.deletarFilme)

module.exports = router;