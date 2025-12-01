const pool = require('../config/rsl');

const clienteModel = {


/**
 * @description Cria um novo cadastro de cliente no sistema.
 *
 * @param {string} pNomeCompleto - Nome completo do cliente.
 * @param {string} pCpf - CPF do cliente.
 * @param {string} pTelefone - Telefone do cliente.
 * @param {string} pEmail - Email do cliente.
 * @param {string} pEndereco - Endereço completo do cliente.
 * 
 * @route POST /clientes
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
 * @description Verifica se um CPF já está cadastrado no sistema.
 *
 * @param {string} pCpf - CPF a ser verificado.
 * 
 * @route POST /clientes/validar-cpf
 *
 * @returns {Promise<Object|null>} Dados do cliente, caso exista.
 */    validacaoCpf: async (pCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?;'
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },



    /**
 * @description Busca todos os clientes cadastrados.
 * 
 * @route GET /clientes
 *
 * @returns {Promise<Array>} Lista completa de clientes.
 */ buscarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },


    /**
 *@description Busca um cliente específico pelo ID.
 *
 * @param {number} pId - ID do cliente.
 * 
 * @route GET /cliente?id=1
 *
 * @returns {Promise<Object|null>} Dados do cliente, caso encontrado.
 */     buscaPeloId: async (pId) => {
        const sql = `SELECT * FROM clientes WHERE id_cliente = ?`;
        const values = [pId]
        const [rows] = await pool.query(sql, values);
        return rows;
    },



    /**
 * @description Atualiza as informações de um cliente existente.
 *
 * @param {string} pNomeCompleto - Novo nome completo do cliente.
 * @param {string} pCpf - Novo CPF do cliente.
 * @param {string} pTelefone - Novo número de telefone.
 * @param {string} pEmail - Novo email.
 * @param {string} pEndereco - Novo endereço.
 * @param {number} pIdCliente - ID do cliente a ser atualizado.
 * 
 * @route PUT /clientes/:idCliente
 *
 * @returns {Promise<Object>} Resultado da atualização no banco.
 */    alterarClientes: async (pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco, pIdCliente) => {
        const sql = 'UPDATE clientes SET nome_completo=?, cpf=?, telefone=?, email=?, endereco=? WHERE id_cliente = ?';
        const values = [pNomeCompleto, pCpf, pTelefone, pEmail, pEndereco, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;

    },

     deleteProduto: async (pId)=>{
const sql = 'DELETE FROM produtos WHERE id_produto = ?; ' ;
const values = [pId];
const [rows] = await pool.query(sql, values);
return rows;

};

module.exports = { clienteModel };