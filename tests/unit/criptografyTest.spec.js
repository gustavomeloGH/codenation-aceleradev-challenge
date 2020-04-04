const { cesarCipherDecrypt } = require('../../src/utils/cryptographyUtil');
const { sha1Encrypt } = require('../../src/utils/cryptographyUtil');

describe('CesarCipherDecrypt Test - Decript', () => {
    
    it('should decrypt message: a ligeira raposa marrom saltou sobre o cachorro cansado', () => {
        const message = 'd oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr';
        const decryptedMessage = cesarCipherDecrypt(message, 3);
        expect(decryptedMessage).toBe('a ligeira raposa marrom saltou sobre o cachorro cansado');
    });

    it('should decrypt message with numberOfHouse = 11', () => {
        const message = 'esp dpncpe zq rpeetyr lsplo td rpeetyr delcepo. xlcv ehlty';
        const decryptedMessage = cesarCipherDecrypt(message, 11);
        expect(decryptedMessage).toBe('the secret of getting ahead is getting started. mark twain');
    });

});



describe('Sha1Encrypt Test - Encript', () => {
    
    it('should encript message: ', () => {
        const message = 'the secret of getting ahead is getting started. mark twain';
        const decryptedMessage = sha1Encrypt(message);
        expect(decryptedMessage).toBe('95097184b9e73da446ef30719c6bf076458dc6ee');
    });

});
