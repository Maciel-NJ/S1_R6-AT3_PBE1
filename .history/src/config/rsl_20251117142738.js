const mysql = require('mysql2/promise');

const pool = mysql.createPool({

host:'localhost',
user:'root',
password:'1234',
database:'lojaDB',
port:3308,
waitForConnections: true,                //serve para esperar conexões que estejam livres
connectionLimit: 10,                     //número máximo de conexões
queueLimit: 0                            //número máximo de conexões na fila

});


(async () => {
    try {

const connection = await pool.getConnection();
console.log('Conexão ao MySQL bem-sucedida!');
connection.release();
    } 
    catch (error) {
         console.error(`Erro ao conectar ao MySQL: ${error}`);
    }

})();


module.exports = pool;