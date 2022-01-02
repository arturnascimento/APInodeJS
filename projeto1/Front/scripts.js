const { buscarFilmesPorId } = require("../Back/Services/FilmeService");

const apiUrl = "http://localhost:3000";
const lista = document.getElementById('lista');
let modoEdicao = false;
let idEdicao = 0;

const buscarFilmes = async () => {
    const response = await fetch(`${apiUrl}/filmes`)
    const filmes = await response.json()

    filmes.map((filme) => {
        lista.insertAdjacentHTML(
            "beforeend",
            `
                <section class="card">
                <img src="${filme.imagem}">
                <div class="texto">
                    <div class="nome">${filme.nome}</div>
                    <div>Genero: ${filme.genero}</div>
                    <div>Nota: ${filme.nota}</div>
                    <div>
                    ${filme.view? 
                        '<div><span class="indicator online"></span>Assistiu</div>' : 
                        '<div><span class="indicator offline"></span>Não Assistiu</div>'}
                    </div>
                <button onclick="deleteFilme(${filme.id})" class="botao"> Deletar</button>
                <button onclick="editarFilme(${filme.id})" class="botao">Editar</button>
                <button onclick="marcarView(${filme.id})" class="botao">Marcar View</button>
                </div>
                </section>
            `
        )
    })
}
buscarFilmes()

const filmesPorId = async (id) => {

    const response = await fetch(`${apiUrl}/filmes/${id}`)
    const filme = await response.json();
    return filme
}

const FilmePorId = async () => {
    const id = document.getElementById("valueID").value
    const response = await fetch(`${apiUrl}/filmes/${id}`)
    const filmePorId = await response.json()
    if(document.getElementById('card2'))
    {
    const card = document.getElementById('card2')
    card.parentNode.removeChild(card)
    }   
    document.getElementById("Escolhido").insertAdjacentHTML(
        "beforeend",
        `
        <section id="card2">
            <img src="${filmePorId.imagem}">
            <div class="texto">
                <div class="nome">${filmePorId.nome}</div>
            </div>
        </section>
    
        `
    )
}

const submitForm = () => {
    const nome = document.getElementById('nome').value
    const imagem = document.getElementById('imagem').value
    const genero = document.getElementById('genero').value
    const nota = document.getElementById('nota').value
    const filme = {
        nome,
        imagem,
        genero,
        nota
    }
    if(modoEdicao) {
        atualizarFilme(filme)
    }
    else {
        criarFilme(filme)
    }
    
}

const criarFilme = async (filme) => {
    const responde = await fetch(`${apiUrl}/filmes/adicionar`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    lista.innerHTML = ''
    buscarFilmes()
    limparCampos()
}

const deletarFilme = async (id) => {
    const responde = await fetch(`${apiUrl}/filmes/deletar/${id}`, {
        method: 'DELETE'
    })
    lista.innerHTML = ''
    buscarFilmes()
}

const limparCampos = () => {

    document.getElementById('nome').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('nota').value = '';
}

const atualizarFilme = async (filme) => {
    const response = await fetch(`${apiUrl}/filmes/editar/${idEdicao}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    lista.innerHTML = '';
    buscarFilmes();
    limparCampos();

    modoEdicao = false;
    idEdicao = 0;
}

const atualizarFilme = async (id) => {
    modoEdicao = true;
    idEdicao = id;
    const filme = await buscarFilmesPorId(id);

    document.getElementById('nome').value = filme.nome;
    document.getElementById('imagem').value  = filme.imagem;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('nota').value = filme.nota;
}

const marcarView = async (id) => {
    const filme = await buscarFilmesPorId(id)
    if(filme.view == false){
        filme.view = true
        console.log(filme.view)
    }else{
        filme.view = false
        console.log(filme.view)
    }
    const response = await fetch(`${apiUrl}/filmes/editar/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    lista.innerHTML = '';
    buscarFilmes();
}