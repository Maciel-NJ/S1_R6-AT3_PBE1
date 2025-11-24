const pool = require('../config/db')

const clienteModel = {



criarCadastro: async (pNome, pCpf) => {

        const sql = 'INSERT INTO clientes (nome, cpf) VALUES  (?, ?)';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }

    
};