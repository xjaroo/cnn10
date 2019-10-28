const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://transcripts.cnn.com/TRANSCRIPTS/1910/25/sn.01.html';

const promise = new Promise( (resolve, reject) => {
    axios.get(url)
        .then( res => {
            data = [];
            const $ = cheerio.load(res.data);
            $('.cnnBodyText').each ((i, elem) => {
                 data.push($(elem).text());
                 resolve(data);
            })

        })
        .catch( err => {
           reject(err.message);
        })

});

promise.then(data =>{
    console.log(data[2].replace(/\s{2,5}/g,' ').replace(/\.\s/g,'.\r\n\r\n'));
})

