const pool = require('../config/db')

const clienteModel = {



criarCadastro: async (pNomeCompleto, pCpf, pTelefone) => {

        const sql = 'INSERT INTO clientes (nome, cpf) VALUES  (?, ?)';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }

    
};

module.exports = { clienteModel };