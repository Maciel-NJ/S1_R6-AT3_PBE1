const pool = require('../config/rsl');

const pedidoModel = {

    /**
 * @description Insere um novo pedido e cria automaticamente a entrada vinculada.
 *
 * @param {number} pIdCliente      - ID do cliente que realizou o pedido.
 * @param {string} pTipoEntrega    - Tipo da entrega (ex: "rápida", "normal").
 * @param {number} pValorBaseKg    - Valor base por KG.
 * @param {number} pValorBaseKm    - Valor base por KM.
 * @param {number} pPesoKg         - Peso total do pedido em KG.
 * @param {number} pDistanciaKm    - Distância prevista da entrega.
 * @param {string} pDataPedido     - Data do pedido (YYYY-MM-DD).
 * 
 * @route POST /pedidos
 *
 * @returns {Promise<Object>} Retorna os registros inseridos: { rowsPedido, rowsEntrega }.
 */    insertPedido: async (pIdCliente, pTipoEntrega, pValorBaseKg, pValorBaseKm, pPesoKg, pDistanciaKm, pDataPedido ) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            
            const sqlPedido = `INSERT INTO pedidos (id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const valuesPedido = [pIdCliente, pTipoEntrega, pValorBaseKg, pValorBaseKm, pPesoKg, pDistanciaKm, pDataPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);
            
            const sqlEntrega = `INSERT INTO entregas (id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const valuesEntrega = [rowsPedido.insertId, 0, 0, 0, 0, 0, 0, 'pendente'];
            const [rowsEntrega] = await connection.query(sqlEntrega, valuesEntrega);    

           
            connection.commit();
            return { rowsPedido, rowsEntrega };

        } catch (error) {
            connection.rollback();
            throw error;

        }
    },



    /**
 * @description Atualiza os dados de um pedido existente.
 *
 * @param {string} pDataPedido     - Nova data do pedido.
 * @param {string} pTipoEntrega    - Novo tipo de entrega.
 * @param {number} pDistanciaKm    - Nova distância para entrega.
 * @param {number} pPesoKg         - Novo peso do pedido em KG.
 * @param {number} pValorBaseKm    - Novo valor base por KM.
 * @param {number} pValorBaseKg    - Novo valor base por KG.
 * @param {number} pId             - ID do pedido a ser atualizado.
 * 
 * @route PUT /pedidos/:idPedido
 *
 * @returns {Promise<Object>} Retorna o resultado da operação (linhas afetadas).
 */   atualizarPedido: async (pDataPedido, pTipoEntrega, pDistanciaKm, pPesoKg, pValorBaseKm, pValorBaseKg, pId) => {
        const sql = 'UPDATE pedidos SET data_pedido=?, tipo_entrega=?, distancia_km=?, peso_kg=?, valor_base_km=?, valor_base_kg=? WHERE id_pedido = ?; ';
        const values = [pDataPedido, pTipoEntrega, pDistanciaKm, pPesoKg, pValorBaseKm, pValorBaseKg, pId];
        const [rows] = await pool.query(sql, values);

        return rows; 

    },

/**
 * @description Busca um pedido pelo seu ID.
 * 
 * @param {number} pedidoId 
 * @param {number} pedidoId - ID do pedido a ser buscado.
 * 
 * @route GET /pedidos/:idPedido
 *
 * @returns {Promise<Object|null>} Retorna o pedido encontrado ou null se não existir.
 */
    buscarPedidoPeloId: async (pedidoId) => {
        const sql = "SELECT * FROM pedidos WHERE id_pedido = ?";
        const [rows] = await pool.query(sql, [pedidoId]);
        return rows[0];
    },


/**
 * @description Busca todos os pedidos cadastrados no sistema.
 * 
 * @route GET /pedidos
 * 
 * @returns {Promise<Array>} Retorna todos os pedidos.
 */
    buscarTodosPedidos: async () => {
        const sql = 'SELECT * FROM pedidos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

/**
 * @description Exclui um pedido pelo seu ID.
 * 
 * @param {number} pId 
 * @
 * 
 * @returns {Promise<Object>} Resultado da exclusão.
 */
     deletePedido: async (pId)=>{
const sql = 'DELETE FROM pedidos WHERE id_pedido = ?; ' ;
const values = [pId];
const [rows] = await pool.query(sql, values);
return rows;
     }
   
};

module.exports = { pedidoModel };