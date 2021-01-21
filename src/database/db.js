// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3")


// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
    // com comandos sql eu vou:

    // 1 Criar uma tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2 Inserir dados na tabela
    const query = `
            INSERT INTO places (
                name,
                image,
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1602&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInserDate(err){
        if(err){
            return console.log(err)
        }
            console.log("Cadastrado com sucesso")
            console.log(this)
    }

    db.run(query, values, afterInserDate)

    // 3 Consultar os dados da tabela

    // 4 Deletar um dado da tabela

})