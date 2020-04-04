const fs = require('fs');
const logger = require('colog');
const path = require('path');

/**
 * Repositório responsável
 * por arquivos
 */
module.exports = {

    /**
     * Realiza a escrita do arquivo
     * @param {nome do arquivo} fileName 
     * @param {extensão do arquivo} extension 
     * @param {dado a ser salvo no arquivo} data 
     */
    write(fileName, extension, data) {
        const fullFileName = `${fileName}.${extension}`;
        logger.info(`[INFO] Os dados serão salvo no arquivo ${fullFileName}.`);

         fs.writeFileSync(fullFileName, JSON.stringify(data));
    },

    /**
     * 
     * Realiza a leitura do arquivo
     * @param {nome do arquivo} fileName 
     * @param {extensão do arquivo} extension 
     * @return {arquivo lido}
     */
    read(fileName, extension) {
        const fullFileName = `${fileName}.${extension}`;

        logger.info(`[INFO] Realizando a leitura do arquivo ${fullFileName}.`);
        
        const filePath = path.resolve(fullFileName);
        return fs.readFileSync(filePath, 'utf8')
    },

    readStream(fileName, extension) {
        const fullFileName = `${fileName}.${extension}`;
        return fs.createReadStream(fullFileName);
    }
}