const pool = require('../config/rsl');

const clienteModel = {



criarCadastro: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereço) => {

        const sql = 'INSERT INTO clientes (nome_completo, cpf, telefone, email, endereço) VALUES  (?, ?, ?, ?, ?)';
        const values = [pNomeCompleto, pCpf, pTelefone, pEmail, pEndereço];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },


    validacaoCpf: async (pCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?;'
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    
};

module.exports = { clienteModel };