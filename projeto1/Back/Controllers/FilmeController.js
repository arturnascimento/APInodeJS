const Service = require("../Services/FilmeService")

const buscarFilmes = (req, res) => {
    const filmes = Service.buscarFilmes()
    res.send(filmes)
}

const buscarFilmesPorId = (req, res) => {
    const id = req.params.id
    const filme = Service.buscarFilmesPorId(id)
    res.send(filme)
}
const criarFilme = (req, res) => {
    const filme = req.body
    const newFilme = Service.criarFilme(filme)
    res.send(`Filme ${newFilme.nome}`)
}
const atualizarFilme = (req, res) => {
    const id = req.params.id
    const Filme = req.body
    const FilmeAtualizado = Service.atualizarFilme(id, Filme)
    if(FilmeAtualizado){
        res.send({message: `Filme ${Filme.nome} foi atualizado`})
    }
    else{
        res.status(404).json({error: "Filme não encontrado"})
    }
}
const deletarFilme = (req, res) => {
    Service.deletarFilme(req.params.id)
    res.send(`Foi deletado com sucesso`)
    
}
module.exports = {
    buscarFilmes,
    buscarFilmesPorId,
    criarFilme,
    atualizarFilme,
    deletarFilme
}