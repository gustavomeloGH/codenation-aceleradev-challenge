const sha1 = require('sha1');
const logger = require('colog');

const startOfLetterCharCode = 97;
const endOfLetterCharCode = 122;

/**
 * Utils utilizados para
 * encriptar e decriptar
 */
module.exports = {
    
    /**
     * Util responsável por 
     * realizar a decriptografia
     * da Cifra de César
     * @param {Mensagem a ser decriptograda} message 
     * @param {Numero de casas a ser decrementadas de cada letra} numberOfHouses 
     * @return {mensagem decriptografada}
     */
    cesarCipherDecrypt(message, numberOfHouses) {
        logger.info('[INFO] Decriptando - Cifra de Cesar');

        let decryptedMessage = ''; 
        message = message.toLowerCase();

        for (const letter of message) {
            const charCode = letter.charCodeAt(0);
        
            let letterDecrypt;

            if (belongsToLowercaseLetters(charCode)) {
                let decrementedCharCode = charCode - numberOfHouses;

                if (!belongsToLowercaseLetters(decrementedCharCode)) {
                    let subtration = charCode - startOfLetterCharCode;
                    let newNumberOfHouse = numberOfHouses - subtration;
                    decrementedCharCode = endOfLetterCharCode - newNumberOfHouse + 1;
                }

                letterDecrypt = String.fromCharCode(decrementedCharCode);
            } else {
                letterDecrypt = letter;
            }

            decryptedMessage += letterDecrypt;
        }

        return decryptedMessage;
    },

    /**
     * Responsável por encriptar a mensagem em SH1
     * @param {mensagem a ser criptografada em SH1} message 
     * @return {mensagem criptografada em SH1}
     */
    sha1Encrypt(message) {
        logger.info('[INFO] Encriptando - SHA1');

        message = message.toLowerCase();
        return sha1(message);
    }

}

/**
 * Método auxiliar para
 * verificar se uma letra
 * pertence ao alfabeto de letras
 * minúsculas (a-z)
 * @param {letra a ser verificada} charCode 
 * @return {true: pertence | false: contrário}
 */
function belongsToLowercaseLetters(charCode) {
    return charCode >= startOfLetterCharCode && charCode <= endOfLetterCharCode;
}
