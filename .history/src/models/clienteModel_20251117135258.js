const pool = require('../config/db')

const clienteModel = {



criarCadastro: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco) => {

        const sql = 'INSERT INTO clientes (nome, cpf) VALUES  (?, ?)';
        const values = [pNomeCompleto, pCpf, pTelefone];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }

    
};

module.exports = { clienteModel };