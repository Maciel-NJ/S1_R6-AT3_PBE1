const pool = require('../config/rsl');

const clienteModel = {


/**
 * Cria um novo cadastro de cliente no sistema.
 *
 * @param {string} pNomeCompleto - Nome completo do cliente.
 * @param {} pCpf - CPF do cliente.
 * @param {*} pTelefone - Telefone do cliente.
 * @param {*} pEmail - Email do cliente.
 * @param {*} pEndereco - Endereço completo do cliente.
 *
 * @returns {Promise<Object>} Resultado da inserção no banco.
 */criarCadastro: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco) => {

        const sql = 'INSERT INTO clientes (nome_completo, cpf, telefone, email, endereco) VALUES  (?, ?, ?, ?, ?)';
        const values = [pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },


    /**
 * Verifica se um CPF já está cadastrado no sistema.
 *
 * @param {*} pCpf - CPF a ser verificado.
 *
 * @returns {Promise<Object|null>} Dados do cliente, caso exista.
 */    validacaoCpf: async (pCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?;'
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },



    /**
 * Busca todos os clientes cadastrados.
 *
 * @returns {Promise<Array>} Lista completa de clientes.
 */ buscarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },


    /**
 * Busca um cliente específico pelo ID.
 *
 * @param {*} pId - ID do cliente.
 *
 * @returns {Promise<Object|null>} Dados do cliente, caso encontrado.
 */     buscaPeloId: async (pId) => {
        const sql = `SELECT * FROM clientes WHERE id_cliente = ?`;
        const values = [pId]
        const [rows] = await pool.query(sql, values);
        return rows;
    },



    /**
 * Atualiza as informações de um cliente existente.
 *
 * @param {*} pNomeCompleto - Novo nome completo do cliente.
 * @param {*} pCpf - Novo CPF do cliente.
 * @param {*} pTelefone - Novo número de telefone.
 * @param {*} pEmail - Novo email.
 * @param {*} pEndereco - Novo endereço.
 * @param {*} pIdCliente - ID do cliente a ser atualizado.
 *
 * @returns {Promise<Object>} Resultado da atualização no banco.
 */    alterarClientes: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco, pIdCliente) => {
        const sql = 'UPDATE clientes SET nome_completo=?, cpf=?, telefone=?, email=?, endereco=? WHERE id_cliente = ?';
        const values = [pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;

    }
    
};

module.exports = { clienteModel };