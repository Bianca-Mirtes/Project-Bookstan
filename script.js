const posts = Array.from({});

createPost("https://m.media-amazon.com/images/I/61-RlelxM3L.jpg", "https://www.amazon.com.br/Coroa-Kiera-Cass/dp/8555340047", "Às vezes, se apaixonar é a atitude mais corajosa que alguém pode ter.",
                "A Coroa", "Kiera Cass") 
createPost("https://m.media-amazon.com/images/I/71FgjsfNMtL.jpg", "https://www.amazon.com.br/Qualquer-Outro-Lugar-G-Howard/dp/8581638309",
                "Pensar duas vezes a cada passo restringe o ímpeto de avançar. Confie em si mesma, perdoe-se e siga adiante.", "Qualquer Outro Lugar",
                "A. G. Howard")
createPost("https://m.media-amazon.com/images/I/81u4JJUKSRL.jpg", "https://www.amazon.com.br/Novembro-9-Colleen-Hoover/dp/8501076252", "⁠Uma das coisas que sempre tento lembrar a mim mesma é que todo mundo têm cicatrizes [...] Muita gente tem umas ainda piores do que as minhas. A única diferença é que as minhas são visíveis e a da maioria das pessoas, não.",
                "Novembro Nove", "Collen Hoover")
createPost("https://m.media-amazon.com/images/I/81lDHYGLf4L.jpg", "https://www.amazon.com.br/Clube-do-Livro-dos-Homens/dp/6555650656", "Todos nós somos a soma total de nossas experiências em um determinado momento, e nossas reações às coisas são moldadas por elas. Assim como nos romances. O que quer que um personagem tenha passado antes do início do livro acabará determinando como ele reage às coisas que acontecem no livro.",
                "Clube do Livro dos Homens #Livro 1", "Lyssa Kay Adams")
createPost("https://m.media-amazon.com/images/I/81u8c5lziEL.jpg", "https://www.amazon.com.br/Até-verão-terminar-Colleen-Hoover/dp/6559810372", "Se você estiver lendo isso, quer dizer que evaporei. Mas não quer dizer que você deva evaporar também. Vá inundar a p&##@ do mundo todo, Beyah...",
            "Até o Verão Terminar", "Collen Hoover")
createPost("https://m.media-amazon.com/images/I/91N9kjbqxWS.jpg", "https://www.amazon.com.br/rei-perverso-Vol-Povo-Ar/dp/8501118834", "Se você é a doença, acho que não pode ser a cura também.",
            "O Rei Perverso", "Holly Black")
createPost("https://m.media-amazon.com/images/I/51HCoHH0uvL.jpg", "https://www.amazon.com.br/Atrás-espelho-lado-sombrio-Livro-ebook/dp/B00NEV8BFI", "Nada pode quebrar os laços que você inspirou no meu coração. Porque você é o País das Maravilhas.",
            "Atrás do Espelho", "A. G. Howard")
createPost("https://m.media-amazon.com/images/I/81jqGtBE2qL.jpg", "https://www.amazon.com.br/Assim-que-Acaba-Colleen-Hoover/dp/8501112518", "[..] Plantas recompensam a pessoa com base na quantidade de amor que recebem. Se for cruel ou negligenciá-las, elas não te dão nada. Mas se cuidar delas, se amá-las do jeito certo, vão te recompensar com presentes na forma de verduras, frutas ou flores.",
            "É Assim que Acaba", "Colleen Hoover");

function createPost(adressImage, linkBook, phraseBook, nameBook, autorBook){
    posts.push(`
    <div class="post">
        <div class="imagem-book">
            <a href="${linkBook}"
                target="_blank"><img src="${adressImage}" alt="Foto do livro ${nameBook}">
            </a>
        </div>
        <div class="texto">
            <p>"${phraseBook}" - ${nameBook} (${autorBook})</p>                    
        </div>
    </div>`)
    console.log(posts)
}

const state = {
    page: 1,
    perPage: 5,
    totalPages: Math.ceil(posts.length / 5)
}

const controls = {
    next() {
        state.page++;

        const lastPage = state.page > state.totalPages;
        if(lastPage){
            state.page--;
        }
        update()
    },
    prev() {
        state.page--;

        const firstPage = state.page < 1;
        if(firstPage){
            state.page++;
        }
        update();
    },
    goTo(page) {
        state.page = page;
        if(state.page > state.totalPages){
            statePage = state.totalPages;
        }
        if(state.page < 1){
            state.page = 1;
        }
        update();
    },
    createEvents() {
        document.querySelector('.first').addEventListener("click", () => {controls.goTo(1)});
        document.querySelector('.next').addEventListener("click", () => {controls.next()});
        document.querySelector('.prev').addEventListener("click", () => {controls.prev()});
        document.querySelector('.last').addEventListener("click", () => {controls.goTo(state.totalPages)});
    }
}

const list = {
    create(itemsPage) {
        const div = document.createElement('div');
        div.classList.add('post')
        div.innerHTML = itemsPage;
        
        document.querySelector('.posts').appendChild(div)
    },
    update() {
        document.querySelector('.posts').innerHTML = ""

        document.querySelector('.numbers').innerHTML = ""
        const div = document.createElement('div')
        div.innerHTML = state.page;

        document.querySelector('.numbers').appendChild(div);

        let page = state.page - 1;

        const itemsPage = posts.slice(page * state.perPage, (page+1) * state.perPage)
        itemsPage.forEach(list.create);


    }
}

function update (){
    list.update();
}

function init(){
    list.update();
    controls.createEvents();
}

init()