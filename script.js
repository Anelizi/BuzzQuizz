let quizzes = [];
const todosQuizzes = document.querySelector('.todosQuizzes');
const capaQuizz = document.querySelectorAll('.imagemCapaQuizz');


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

    for (let i = 0; i < quizzes.length; i++) {

        let styles = window.getComputedStyle(capaQuizz[i])

        styles.backgroundImage = `url('https://uploads.jovemnerd.com.br/wp-content/uploads/2022/03/gandalf-colecionavel-01.jpg')`;

        todosQuizzes.innerHTML += `
            <li class="quizz">
                    <div class="imagemCapaQuizz"></div>
                    <p class="tituloQuizz">Acerte os personagens corretos dos Simpsons e prove seu amor!</p>
                </li>
        `
    }
}

/* capaQuizz[i].style.backgroundImage = `url('https://uploads.jovemnerd.com.br/wp-content/uploads/2022/03/gandalf-colecionavel-01.jpg')`; */











































































































































































































