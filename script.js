let quizzes = [];
let quizz = [];
const tela1 = document.querySelector('.tela1');
const tela2 = document.querySelector('.tela2');
const tela3 = document.querySelector('.tela3');
const todosQuizzes = document.querySelector('.todosQuizzes');
let opcoes;

let respostasNaoSelecionadas;

const scrollarCima = () => document.body.scrollTop = document.documentElement.scrollTop = 0;

let idQuizz;



pegarQuizzes();

// OBTER QUIZZES NO SERVIDOR
function pegarQuizzes() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promisse.then(quizzesRecebidos);
    promisse.catch(quizzesNaoRecebidos);
}

function quizzesRecebidos(quizzesServidor) {
    quizzes = quizzesServidor.data;
    console.log('tudo ok');
    console.log(quizzes[1]);
    renderizarListaQuizzes();
}

function quizzesNaoRecebidos(quizzesNaoRecebidos) {
    console.log('Erro ao receber quizzes');
}

//-----------------------------

// RENDERIZAR QUIZZES NA PÁGINA LISTA DE QUIZES

function renderizarListaQuizzes() {
    todosQuizzes.innerHTML = '';

    for (let i = 0; i + 2 < quizzes.length; i++) { // +2 aqui para deixar alinhado bonito no modo desktop, uma vez que recebemos 50 quizzes do servidor e 50 não é divisivel por 3;

        todosQuizzes.innerHTML += `
            <li class="quizz" id="${i}" onclick="abrirQuizz(this)">
                    <div class="imagemCapaQuizz"></div>
                    <p class="tituloQuizz">${quizzes[i].title}</p>
                    <p class="id esconder">${quizzes[i].id}</p>
                </li>
        `;
        

        const capaQuizz = document.querySelectorAll('.imagemCapaQuizz');
        console.log(capaQuizz);
        let url = quizzes[i].image;
        capaQuizz[i].style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${url})`;
    }
}

// ---------------------------------------------------------------------------------


// ABRIR QUIZZ 
function abrirQuizz(quizzSelecionado) {
    tela1.classList.add('esconder');
    tela2.classList.remove('esconder');
    tela3.classList.add('esconder');
    
    scrollarCima();
    
    const idQuizzSelecionado = quizzSelecionado.querySelector('.id');
    idQuizz = (idQuizzSelecionado.innerHTML);
    console.log(idQuizz); // DENTRO DESSE IDQUIZZ ESTÁ O ID DO QUIZZ SELECIONADO
    pegarQuizz()
}

// RENDERIZAR QUIZ COM SUAS PERGUNTAS E RESPOSTAS
function renderizarQuizz() {
    tela2.innerHTML = '';

    tela2.innerHTML = `
        <div class="tituloImagem">${quizz.title}</div>
    `

    const imagemTituloQuizz = document.querySelector('.tituloImagem');

    let url = quizz.image;
    imagemTituloQuizz.style.backgroundImage = `url(${url})`;


    for (let i = 0; i < quizz.questions.length; i++) {
        
        tela2.innerHTML += `
            <ul class="perguntas">

                <li class="pergunta">

                    <div class="caixaPergunta" style="background-color: ${quizz.questions[i].color};">${quizz.questions[i].title}</div>

                    <ul class="opcoes"> </ul>
                </li>
            </ul>
    `
        opcoes = document.querySelectorAll('.opcoes')
        

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            
            opcoes[i].innerHTML += `
            <li class="opcao" onclick="respostaSelecionada(this)"> <img class="imagem" src="${quizz.questions[i].answers[j].image}" alt="imagem ${j}">
                <p class="texto">${quizz.questions[i].answers[j].text}</p>
                <p class="resposta" style="display: none;">${quizz.questions[i].answers[j].isCorrectAnswer}</p>
            </li>
            `
        }

        
    }
    
    
}


// RESPOSTA SELECIONADA DO QUIZZ
function respostaSelecionada(respostaSelecionadaQuizz) {
    const imagem = respostaSelecionadaQuizz.querySelector('.imagem')
    
    const respostaQuizzSelecionado = respostaSelecionadaQuizz.querySelector('.resposta');
    let respostaQuizz = (respostaQuizzSelecionado.innerHTML);

    respostasNaoSelecionadas = document.querySelectorAll('.opcao')

    for (let i = 0; i < respostasNaoSelecionadas.length; i++) {
        respostasNaoSelecionadas[i].classList.add('naoEscolhida')
    }

    respostaSelecionadaQuizz.classList.remove('naoEscolhida')

    if (respostaQuizzSelecionado.innerHTML == 'true') {
        respostaSelecionadaQuizz.classList.add('respostaCerta')
    } else {
        respostaSelecionadaQuizz.classList.add('respostaErrada')
    }
}


// SOLICITAR AO SERVIDOR QUIZZ ATRAVÉS DO ID
function pegarQuizz() {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    promisse.then(quizzRecebido);
    promisse.catch(quizzNaoRecebido);
}

function quizzRecebido(quizzRecebido) {
    quizz = quizzRecebido.data
    console.log('quizz unitário recebido com sucesso')
    console.log(quizz)
    renderizarQuizz()
}

function quizzNaoRecebido(quizzNaoRecebido) {
    console.log('erro ao receber quizz unitário do servidor')
}

// BOTÃO VOLTAR PARA HOME
function home() {
    tela1.classList.remove('esconder');
    tela2.classList.add('esconder');
    tela3.classList.add('esconder');
    scrollarCima()
}


// BOTÃO CRIAR QUIZZ TELA 1
function criarQuizz() {
    
    let paginaAtual =  document.querySelector(".tela1")
    let proximaPagina = document.querySelector(".tela31")
    paginaAtual.classList.add("desaparece")
    proximaPagina.classList.remove("desaparece")

}


function dadosBasicos(esseBotao){
    titulo = document.querySelector("#input_1").valor
    url = document.querySelector("#input_2")
    numPerguntas = document.querySelector("#input_3")
    numNiveis = document.querySelector("#input_4")

    console.log(titulo)
    if(titulo == "" || url == "" || numPerguntas == "" || numNiveis == ""){
       alert("Dados insuficientes")
    }
    else{
       proxima1(esseBotao)
    }

}



function proxima1(botao){
    let paginaAtual = botao.parentNode
    let proximaPagina = document.querySelector(".tela32")
    paginaAtual.classList.add("desaparece")
    proximaPagina.classList.remove("desaparece")
}

function proxima2(botao){
    let paginaAtual = botao.parentNode
    let proximaPagina = document.querySelector(".tela33")
    paginaAtual.classList.add("desaparece")
    proximaPagina.classList.remove("desaparece")
}

function proxima3(botao){
    let paginaAtual = botao.parentNode
    let proximaPagina = document.querySelector(".tela34")
    paginaAtual.classList.add("desaparece")
    proximaPagina.classList.remove("desaparece")
}

function proxima4(botao){
    let paginaAtual = botao.parentNode
    let proximaPagina = document.querySelector(".tela1")
    paginaAtual.classList.add("desaparece")
    proximaPagina.classList.remove("desaparece")
}
