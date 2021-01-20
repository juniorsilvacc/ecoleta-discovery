const express = require("express")
const server = express()


// Configurar pasta publica
server.use(express.static("public"))


// Configurar caminhos na minha aplicação
// Pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})


// Ligar o servidor
server.listen(3000)