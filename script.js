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

                <li class="pergunta naoRespondida">

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
    let proximaPergunta = document.querySelector(".naoRespondida")
    if(respostaSelecionadaQuizz.parentNode.parentNode == proximaPergunta){

    let opcoes = respostaSelecionadaQuizz.parentNode
    let alternativas = opcoes.querySelectorAll('.opcao')
    
    for(i =0; i<alternativas.length;i++){
        let resposta = alternativas[i].querySelector(".resposta").innerHTML // to me aproveitando da gambiarra do Ricardo pra diferenciar verdadeiro e falso
        
        
        if(alternativas[i] != respostaSelecionadaQuizz){alternativas[i].classList.add("naoEscolhida")}
        if(resposta == "true"){alternativas[i].classList.add('respostaCerta')}
        else{alternativas[i].classList.add('respostaErrada')}
        respostaSelecionadaQuizz.parentNode.parentNode.classList.remove("naoRespondida")
        
        setTimeout(rolarParaPergunta,3000)
    }}
}

function rolarParaPergunta(){
    let proximaPergunta = document.querySelector(".naoRespondida")
    proximaPergunta.scrollIntoView()
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
    tela2.innerHTML = "";
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










































































































































const selecionou1 = document.querySelector('.tela_3_1');
const selecionou2 = document.querySelector('.tela_3_2');
const selecionou3 = document.querySelector('.tela_3_3');
const selecionou4 = document.querySelector('.tela_3_4');

let checkTudo = null;

let quizzTitulo = null;
let UrlImage = null;
let numeroQuetoes = null;
let numerosNives = null;

let objeto = {
    title: '',
    image: '',
    questions: [],
    levels: []
}

function buttonPerguntas(){
    quizzTitulo = document.querySelector('#input_1').value
    UrlImage = document.querySelector('#input_2').value
    numeroQuetoes = document.querySelector('#input_3').value
    numerosNives = document.querySelector('#input_4').value

    let nivesQuestoes = (numerosNives >= 2 && numeroQuetoes >=3);

    let titulo =(quizzTitulo.length > 20 && quizzTitulo.length < 65);

    let UrlImagemCerto = checkUrl(UrlImage)

    if(nivesQuestoes && titulo && UrlImagemCerto){

        objeto.title = quizzTitulo
        objeto.image = UrlImage

       return alert('tudo certo');

       window.scrollTo(0, 0);

    }else{
       return alert('Algo está errado, tente novamente!');
    }
}

function visualizaTela3_2(){
    let tela3_questions = document.querySelector('.tela_3_2');

    for (let i = 1; i <= numeroQuetoes; i++){
        //muda perguntas
        tela3_questions.innerHTML +=`
        <div class="pergunta2" onclick="questoesTela_2(${i})">
            <h3>Pergunta ${i}</h3>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="perguntas${i} desaparece">
            <input id="${i}-question" type="text" placeholder="Texto da pergunta">
            <input id="${i}-color" type="text" placeholder="Cor de fundo da pergunta">
            
            <h3>Resposta correta</h3>
            <input id="${i}-correct-answer" type="text" placeholder="Resposta correta">
            <input id="${i}-correct-url" type="url" placeholder="URL da imagem">
            
            <h3>Respostas incorretas</h3>
            <input id="${i}-wrong-answer1" type="text" placeholder="Resposta incorreta 1">
            <input id="${i}-wrong-url1" type="url" placeholder="URL da imagem 1">

            <input id="${i}-wrong-answer2" type="text" placeholder="Resposta incorreta 2">
            <input id="${i}-wrong-url2" type="url" placeholder="URL da imagem 2">

            <input id="${i}-wrong-answer3" type="text" placeholder="Resposta incorreta 3">
            <input id="${i}-wrong-url3" type="url" placeholder="URL da imagem 3">
        </div>`
    }
    tela3_questions.innerHTML +=`
    <button id="botao_2" class="botaoForm" onclick="perguntas()">
        <p>Prosseguir pra criar níveis</p>
    </button>`
}

function desapareceTela3_3(i){
    const question = document.querySelector(`.perguntas${i}`);
    question.classList.toggle("desaparece");
}

function validaQuestoes(i){
    let objectQuestions ={
        title: '',
        color: '',
        answers: []
    }

    let objectCorrectAnswer ={
        text: '',
        image: '',
        isCorrectAnswer: true
    }

    let objectWrongAnswer1 ={
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    let objectWrongAnswer2 ={
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    let objectWrongAnswer3 ={
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    //valores do inputs

    let textP = document.getElementById(`${i + 1}-question`).value
    let corP = document.getElementById(`${i + 1}-color`).value

    let respostaC = document.getElementById(`${i + 1}-correct-answer`).value
    let urlC = document.getElementById(`${i + 1}-correct-url`).value

    let incorreta1 = document.getElementById(`${i + 1}-wrong-answer1`).value
    let incorretaImg1 = document.getElementById(`${i + 1}-wrong-url`).value

    let incorreta2 = document.getElementById(`${i + 1}-wrong-answer2`).value
    let incorretaImg2 = document.getElementById(`${i + 1}-wrong-url2`).value

    let incorreta3 = document.getElementById(`${i + 1}-wrong-answer3`).value
    let incorretaImg3 = document.getElementById(`${i + 1}-wrong-url3`).value

    objectQuestions.title = textP
    objectQuestions.color = corP

    objectCorrectAnswer.text = respostaC
    objectCorrectAnswer.image = urlC
    objectQuestions.answers.push(objectCorrectAnswer)

    objectWrongAnswer1.text = incorreta1
    objectWrongAnswer1.image = incorretaImg1
    objectQuestions.answers.push(objectWrongAnswer1)

    objectWrongAnswer2.text = incorreta2
    objectWrongAnswer2.image = incorretaImg2
    objectQuestions.answers.push(objectWrongAnswer2)

    objectWrongAnswer3.text = incorreta3
    objectWrongAnswer3.image = incorretaImg3
    objectQuestions.answers.push(objectWrongAnswer3)

    objeto.questions.push(objectQuestions)

    //valida os inputs

    let checktext = (textP.length > 20 && textP.length !== "");
    let checkColor = checkHex(corP);
    let checkAnswer = (respostaC !== "");
    let checkUrlC = checkUrl(urlC);
    let checkAnswerI = (incorreta1 !== "" || incorreta2 !== "" || incorreta3 !== "");
    let checkUrlI = checkUrl(incorretaImg1) || checkUrl(incorretaImg2) || checkUrl(incorretaImg3);

    checkTudo = (checktext && checkColor && checkAnswer && checkUrlC && checkAnswerI && checkUrlI === true);
    return checkTudo;
}

function checkQuestoes(){
    let validar = true;
    for(let i = 0; i < numeroQuetoes; i++){
        let validarA = validaQuestoes(i);
        validar = (validar && validarA);
    }

    if(checkTudo && objeto.questions.length == numeroQuetoes && validar){
        // adicionar 
        
    }else{
        alert("Algo deu errado, tente novamente!")
        objeto.questions = [];
    }
}

function checklevels(){
    for(let i = 1; i <= numeroQuetoes; i++){
        const selecio_levels = document.querySelector('.tela_3_3');
        selecio_levels.innerHTML +=`
        <div class="perguntas2" onclick="desapareceTela3_3(${i})">
            <h3>Nível ${i}</h3>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="perguntas ${i} desaparece">
            <input id="${i}-Tittle_level" class="titulo" type="text" placeholder="Título do nível">
            <input id="${i}-minimum_Hits" type="text" placeholder="% de acerto mínima">
            <input id="${i}-levelUrl" type="url" placeholder="URL da imagem do nível">
            <input id="${i}-LevelDescription" type="text" placeholder="Descrição do nível">
        </div>`
    }
    const levels_sele = document.querySelector('.tela_3_3');
    levels_sele.innerHTML +=`
    <button onclick="validateNiveis()">
        <p>Finalizar Quizz</p>
    </button>`
}

function desapareceTela3_3(i){
    const levels = document.querySelector(`.perguntas ${i}`);
    levels.classList.toggle("desaparece");
}

function validateNiveis(){
    objeto.levels = [];

    for(let i = 0; i < numerosNives; i++){
        let objectLevels = {
            title: '',
            image: '',
            text: '',
            minValue: ''
        }

        let LevelTittle = document.getElementById(`${i + 1}-Tittle_level`).value
        let MinimunHits = document.getElementById(`${i + 1}-minimum_Hits`).value
        let levelUrl = document.getElementById(`${i + 1}-levelUrl`).value
        let LevelDescription = document.getElementById(`${i + 1}-LevelDescription`).value

        objectLevels.title = LevelTittle;
        objectLevels.image = levelUrl;
        objectLevels.text = LevelDescription;
        objectLevels.minValue = parseInt(MinimunHits);

        objeto.levels.push(objectLevels);

        let checkTittleLavel = (LevelTittle.length > 10 && LevelTittle !== "");
        let checkMini = (parseInt(MinimunHits) >= 0 && parseInt(MinimunHits) <= 100);
        let checkUrlLaval = checkUrl(levelUrl);
        let checkDescripLevel = (LevelDescription.length > 30 && LevelDescription !== "");

        if(checkTittleLavel && checkMini && checkUrlLaval && checkDescripLevel){
        }else{
            alert("Algo está errado, tente novamente!");
            break
        }
    }
}

function apareceTela_3_4(){
    const selecio_pronto = document.querySelector(".tela_3_4");
    selecio_pronto.innerHTML +=
    //quizz pronto vem aqui
    `
    
    <button class="botaoForm" onclick="acessarQuizz()">
        <p>Prosseguir pra criar perguntas</p>
    </button>
    <button class="button" onclick="home()">
        <p>Voltar pra home</p>
    </button>`
}

//validado cor
function checkHex(str){
    const her_ok = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return her_ok.test(str);
}

//validado a url
function checkUrl(str){
    if(str != null && str !=''){
        let url_ok = /(https(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        return url_ok.test(str);
    }else{
        return false;
    }
}






































































