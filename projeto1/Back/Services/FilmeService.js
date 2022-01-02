const filmes = [
    {
        id: 1,
        nome: "Harry Potter e a Pedra Filosofal",
        imagem: "https://ingresso-a.akamaihd.net/img/cinema/cartaz/7766-cartaz.jpg",
        nota: "10",
        Exibido: false
    },
    {
        id: 2,
        nome: "Harry Potter e a Câmara Secreta",
        imagem: "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19592-cartaz.jpg",
        genero: "Aventura",
        nota: "10",
        Exibido: false
    },
    {
        id: 3,
        nome: "Harry Potter e o Prisioneiro de Azkaban",
        imagem: "https://www.adorocinema.com/filmes/filme-46865/",
        genero: "Aventura",
        nota: "10",
        Exibido: false
    },
    {
        id: 4,
        nome: "Harry Potter e o Cálice de Fogo",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/7/7b/Harry_Potter_C%C3%A1lice_Fogo_2004.jpg",
        genero: "Aventura",
        nota: "10",
        Exibido: false
    }
]

const buscarFilmes = () => {
    return filmes
}

const buscarFilmesPorId = (id) => {
    return filmes.find((filme) => filme.id == id)
}

const criarFilme = (newFilme) => {
    const IdLista = filmes.length + 1
    newFilme.id = IdLista
    newFilme.Exibido = false
    filmes.push(newFilme)
    return newFilme
}

const deletarFilme = (id) => {
    const IdLista = filmes.findIndex((filme) => filme.id == id)
    const Filme = filmes[IdLista]
    filmes.splice(IdLista, 1)
    return Filme
}

const atualizarFilme = (id, Filme) => {
    const Filme = filmes.findIndex((filme) => filme.id == id)
    if(Filme >= 0) {
        filmes[Filme] = {
            ...filmes[Filme],
            ...Filme
        }
        return true
    }
    else {
        return false
    }
}

module.exports = {
    buscarFilmes,
    buscarFilmesPorId,
    criarFilme,
    deletarFilme,
    atualizarFilme,
}