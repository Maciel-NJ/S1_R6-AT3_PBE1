const pool = require('../config/rsl');

const pedidoModel = {
    insertPedido: async (pIdCliente, pTipoEntrega, pValorBaseKg, pValorBaseKm, pPesoKg, pDistanciaKm, pDataPedido ) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            
            const sqlPedido = `INSERT INTO pedidos (id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const valuesPedido = [pIdCliente, pTipoEntrega, pValorBaseKg, pValorBaseKm, pPesoKg, pDistanciaKm, pDataPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);
            
            const sqlEntrega = `INSERT INTO entregas (id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const valuesEntrega = [rowsPedido.insertId, 'pendente'];
            const [rowsEntrega] = await connection.query(sqlEntrega, valuesEntrega);    

           
            connection.commit();
            return { rowsPedido, rowsEntrega };

        } catch (error) {
            connection.rollback();
            throw error;

        }
    },

   atualizarPedido: async (pD) => {
        const sql = 'UPDATE pedidos SET data_pedido=?, tipo_entrega=?, distancia_km=?, peso_kg=?, valor_base_km=?, valor_base_kg=? WHERE id_produto = ?; ';
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;

    }
};

module.exports = { pedidoModel };