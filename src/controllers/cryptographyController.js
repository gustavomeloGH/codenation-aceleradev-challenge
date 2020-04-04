const { cesarCipherDecrypt } = require('../utils/cryptographyUtil');
const { sha1Encrypt } = require('../utils/cryptographyUtil');
const service = require('../services/codenationService');
const fileRepository = require('../repositories/fileRepository');
const logger = require('colog');
const FormData = require('form-data');

/** 
 * Controlador responsável
 * por gerar a resposta do desafio
 * e realizar a submissão 
 * para Codenation
 */
module.exports = {

    /**
     * Método responsável por:
     * 1 - Obter os dados iniciais do Codenation
     * 2 - Atualizar com a resposta
     * 3 - Salvar como arquivo .json 
     * @param {request da requisição} request 
     * @param {resposta da requisição} response 
     */
    generateInitialAnswerFile(request, response) {
        logger.info('[INFO] Carregando os dados gerados pelo Codenation.');

        return service.generateData()
            .subscribe(
                partOfAnswerData => {
                    logger.info('[INFO] Atualizando o arquivo de dados!');
                    const completeAnswerData = updateAnswerData(partOfAnswerData);
                    fileRepository.write('answer', 'json', completeAnswerData);
                    response.json({
                        message: 'O arquivo contendo a resposta do desafio foi salvo com sucesso!', completeAnswerData
                    })
                },
                 err => ( 
                    response.status(400)
                        .json( { error:'Não foi possivel gerar os dados com o Codenation', err } )
                )
            );
    },

    /**
     * Método responsável por:
     * - Submeter a resposta ao Codenation
     * @param {request da requisição} request 
     * @param {resposta da requisição} response 
     */
    submit(request, response) {
        logger.info('[INFO] Submetendo a resposta com o arquivo de dados!');
        const form = getFormData();

        return service.submit(form)
            .subscribe(
                result => (
                    response.json({
                        message: 'Os dados foram submetidos com sucesso!', result
                    })
                ),
                err => (
                    response.status(400).json({
                        message: 'Os dados não foram submetidos:',
                        error: err.message, 
                    })
                ) 
            )
    }

}

/**
 * Método auxiliar para atualizar 
 * os dados da resposta com a
 * frase decifrada e o resumo 
 * criptográfico 
 * @param {Dados incompleto da resposta} data 
 * @return {Dado completo para resposta}
 */
function updateAnswerData(data) {
    const {
        numero_casas,
        cifrado
    } = data;
    
    const decifrado = cesarCipherDecrypt(cifrado, numero_casas);
    const resumo_criptografico = sha1Encrypt(decifrado);
    
    return  { ...data, decifrado, resumo_criptografico };
}


/**
 * Método auxiliar gerar o formData
 * que irá no body da requisição
 * para submeter ao desafio 
 * @param {Dados incompleto da resposta} data 
 * @return {Dado completo para resposta}
 */
function getFormData() {
    const formData = new FormData();
    formData.append(
        'answer',
        fileRepository.readStream('answer', 'json'),
        { filename: 'answer.json'}
    );
    return formData;
}