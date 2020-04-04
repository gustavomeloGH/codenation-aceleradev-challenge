const config = require('../../config');
const { Axios } = require('axios-observable');
const { map, catchError } = require('rxjs/operators');
const logger = require('colog');

const baseURL = config.codenation.baseUrl;
const token = config.codenation.token;


/**
 * Serviço responsável
 * por fazer a comunicação
 * com a API do Codenation
 */
module.exports = {

    /**
     * Método responsável por obter os dados iniciais
     * vindos do Codenation
     * @return {Observable = response: dados iniciais | error: exceção com mensagem de erro }
     */
    generateData() {
        return Axios.get(`${baseURL}/generate-data?token=${token}`)
            .pipe(
                map(response => {
                    logger.success('[SUCCESS] Os dados iniciais foram gerados!');
                    const { data } = response;
                    console.log(data);
                    return data;
                }),
                catchError(err => {
                    logger.error(`[ERROR] Não foi possivel gerar os dados. ${err}`);
                    throw 'Não foi possivel gerar os dados iniciais com a Codenation!';
                }),
            );
    },

    /**
     * Método responsável por submeter a 
     * resposta para o Codenation
     * @return {Observable = response | error: exceção com mensagem do erro}
     */
    submit(form) {
        const postConfig = { headers:  form.getHeaders() };

        return Axios.post(`${baseURL}/submit-solution?token=${token}`,
            form,
            postConfig
        )
        .pipe(
            map(response => {
                logger.info('[SUCCESS] Os dados foram submetidos com sucesso!');
                const { data } = response;
                console.log(data);
                return data;
            }),
            catchError(err => {
                logger.error(`[ERROR] Não houve sucesso na submissão: ${err}`);
                throw err;
            }),
        );
    }

}