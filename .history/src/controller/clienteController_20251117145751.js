const { clienteModel } = require("../models/clienteModel");

const clienteController = {

    adicionarCliente: async (req, res) => {

        try {
            const { nomeCompleto, cpf, telefone, email, endereco } = req.body;

            if (!nomeCompleto || typeof nomeCompleto !== "string" || nomeCompleto.length < 3 || !cpf || typeof cpf !== "string" || cpf.length !== 11 ||
                 !telefone || typeof telefone !== "string" || telefone.length < 12 || !email || typeof email !== "string" || !endereco || typeof endereco !== "string") {
                return res.status(400).json({ message: 'Os Dados estão inválidos! :(' });

            }

            const cpfEmUso = await clienteModel.validacaoCpf(cpf);
            if (cpfEmUso.length > 0) {
                return res.status(409).json({ message: 'Este CPF já está sendo usado por um cliente :/' });
            }

            const resultado = await clienteModel.criarCadastro(nomeCompleto, cpf, telefone, email, endereco);

            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                res.status(200).json({ message: 'Cliente incluído com sucesso :)', result: resultado })
            }



            else {

                throw new Error('Ocorreu um erro ao tentar cadastrar o cliente :( ');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :( ', errorMessage: error.message });
        }

    }

}

module.exports = { clienteController };