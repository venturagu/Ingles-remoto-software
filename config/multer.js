const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 10 *1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/gif',
            'image/png',
            'image/tif'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
          cb(new Error('Invalid file type.'));  
        }
    },
}