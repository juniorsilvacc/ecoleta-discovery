const express = require("express")
const server = express()

// Pegar o banco de dadoss
const db = require("./database/db")


// Configurar pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended:true}))



// utilizando template njk
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos na minha aplicação
// Pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})




server.get("/create-point", (req, res) => {

    // req.query: query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulário
    // console.log(req.body)

    // Inserir dados no banco de dados
     const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?
            );
        `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInserDate(err){
        if(err){
            return console.log(err)
        }
            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInserDate)

})





server.get("/search", (req, res) => {

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length
    
        // Mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})
    })
})


// Ligar o servidor
server.listen(3000)