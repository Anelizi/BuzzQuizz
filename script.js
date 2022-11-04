let quizzes = [];
const todosQuizzes = document.querySelector('.todosQuizzes');



pegarQuizzes()

// OBTER QUIZZES NO SERVIDOR
function pegarQuizzes() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promisse.then(quizzesRecebidos)
    promisse.catch(quizzesNaoRecebidos)
}

function quizzesRecebidos(quizzesServidor) {
    quizzes = quizzesServidor.data
    console.log('tudo ok')
    console.log(quizzes[1])
    renderizarListaQuizzes()
}

function quizzesNaoRecebidos(quizzesNaoRecebidos) {
    console.log('Erro ao receber quizzes')
}

//-----------------------------

// RENDERIZAR QUIZZES NA PÁGINA LISTA DE QUIZES

function renderizarListaQuizzes() {
    todosQuizzes.innerHTML = ''

    for (let i = 0; i + 2 < quizzes.length; i++) { // +2 aqui para deixar alinhado bonito no modo desktop, uma vez que recebemos 50 quizzes do servidor e 50 não é divisivel por 3;

        todosQuizzes.innerHTML += `
            <li class="quizz">
                    <div class="imagemCapaQuizz"></div>
                    <p class="tituloQuizz">${quizzes[i].title}</p>
                </li>
        `

        const capaQuizz = document.querySelectorAll('.imagemCapaQuizz');
        console.log(capaQuizz)
        let url = quizzes[i].image
        capaQuizz[i].style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${url})`;
    }
}

// ---------------------------------------------------------------------------------


// BOTÃO CRIAR QUIZZ TELA 1
function criarQuizz() {
    
}