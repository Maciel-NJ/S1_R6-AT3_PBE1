const { clienteModel } = require("../models/clienteModel");

const clienteController = {


/**
 * Adiciona um novo cliente ao sistema.
 *
 * @param {object} req - Objeto da requisição contendo os dados enviados pelo usuário.
 * @param {object} res - Objeto de resposta usado para retornar mensagens e resultados.
 * @returns {JSON} Retorna mensagem de sucesso ou erro durante o cadastro.
 */    adicionarCliente: async (req, res) => {

        try {
            const { nomeCompleto, cpf, telefone, email, endereco } = req.body;

            if (!nomeCompleto || typeof nomeCompleto !== "string" || nomeCompleto.length < 3 || !cpf || typeof cpf !== "string" || cpf.length !== 11 || !telefone || typeof telefone !== "string" || telefone.length != 12 || !email || typeof email !== "string" || !endereco || typeof endereco !== "string") {
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

    },


    /**
 * @description Seleciona todos os clientes cadastrados na base de dados.
 * 
 * - Realiza consulta ao Model (clienteModel.buscarTodos).
 * - Caso a tabela esteja vazia, retorna mensagem indicando ausência de registros.
 * - Caso existam dados, retorna a lista completa.
 * - Em caso de erro interno, retorna status 500.
 * 
 * @route GET /clientes
 * 
 * @returns {JSON} Retorna todos os clientes ou mensagem de tabela vazia.
 */    selecionarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.buscarTodos();

            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }

            res.status(200).json({ message: 'Todos os clientes cadastrados:', data: resultado });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :( ', errorMessage: error.message });
        }

    },



    /**
 * @description Busca um cliente específico baseado no ID informado na query.
 * 
 * - Recupera o id via req.query.idCliente.
 * - Converte para número e valida se o valor é um inteiro válido.
 * - Se o ID estiver incorreto, retorna status 400.
 * - Caso esteja correto, consulta o Model (clienteModel.buscarPeloId).
 * - Retorna os dados encontrados.
 * - Em caso de erro interno, retorna status 500.
 * 
 * @route GET /cliente?id=1
 * 
 * @param {Number} idCliente → ID do cliente a ser buscado (via query)
 * 
 * @returns {JSON} Retorna os dados do cliente ou mensagem de erro.
  */    buscarClientePorId: async (req, res) => {
        try {
            const id = Number(req.query.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Informe um ID válido!' });
            }
            const resultado = await clienteModel.buscaPeloId(id);
            res.status(200).json({ message: 'Resultado do cliente procurado:', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :(', errorMessage: error.message });
        }
    },


    
    /**
     
 * Atualiza os dados de um cliente já cadastrado.
 *
 * @param {object} req - Requisição contendo o ID do cliente e os novos dados.
 * @param {object} res - Resposta enviada após tentar realizar a atualização.
 * @returns {JSON} Retorna o resultado da atualização ou mensagem de erro.
 */    atualizarCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            let { nomeCompleto, cpf, telefone, email, endereco } = req.body;

            nomeCompleto = nomeCompleto.trim();

            if (!nomeCompleto || typeof nomeCompleto !== "string" || nomeCompleto.length < 3 || !cpf || typeof cpf !== "string" || cpf.length !== 11 || !telefone || typeof telefone !== "string" || telefone.length != 12 || !email || typeof email !== "string" || !endereco || typeof endereco !== "string") {
                return res.status(400).json({ message: 'Verifique os dados a serem atualizados e tente novamente' });

            }

            const cadastroAtual = await clienteModel.buscaPeloId(idCliente);
            if (cadastroAtual.length === 0) {
                throw new Error('O cadastro do cliente não foi localizado')
            }

            const novoNomeCompleto = nomeCompleto ?? cadastroAtual[0].nomeCompleto;
            const novoCpf = cpf ?? cadastroAtual[0].cpf;
            const novoTelefone = telefone ?? cadastroAtual[0].telefone;
            const novoEmail = email ?? cadastroAtual[0].email;
            const novoEndereco = endereco ?? cadastroAtual[0].endereco;

            const resultado = await clienteModel.alterarClientes(novoNomeCompleto, novoCpf, novoTelefone, novoEmail, novoEndereco, idCliente);

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o cadastro do cliente :(');

            }

            res.status(200).json({ message: 'Cadastro atualizado com sucesso :)', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor  :(', errorMessage: error.message })


        }
    }

}

module.exports = { clienteController };