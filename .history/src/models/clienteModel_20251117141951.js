const pool = require('../config/db')

const clienteModel = {



criarCadastro: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco) => {

        const sql = 'INSERT INTO clientes (nome_completo, cpf, telefone, email, endereco) VALUES  (?, ?, ?, ?, ?)';
        const values = [pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },


    V

    
};

module.exports = { clienteModel };