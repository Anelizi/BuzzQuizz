let quizzes = []

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
    //renderizarQuizzes()
}

function quizzesNaoRecebidos(quizzesNaoRecebidos) {
    console.log('Erro ao receber quizzes')
}

//-----------------------------