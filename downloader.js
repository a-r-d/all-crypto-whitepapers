const request = require('request');
const fs = require('fs');
const download = require('download-file')
const prompt = require('prompt');
const async = require('async')

prompt.start();

async.whilst(() => 1, (callback) => {
  prompt.get(['name', 'code', 'url'], function (err, result) {
    console.log('Command-line input received:', result);
    const { name, code, url } = result
    const filename = name + "-" + url.substring(url.lastIndexOf('/')+1)
    var options = {
      directory: "./whitepapers/",
      filename: filename
    }
    download(url, options, function(err){
        if (err) throw err
        console.log("file downloaded and saved")
        appendCsv(name, code, url, filename)
        callback()
    })
  });
})

function appendCsv(name, code, link, pdf) {
  fs.appendFileSync('./papers-index.csv', [name,code,link,pdf].join(',') + '\n')
}


// appendCsv(result.name, result.code, result.link, 'whitepapers/pdf.pdf')
// const options = {
//   method: 'GET',
//   url: result.link,
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
//     'Cache-Control': 'max-age=0'
//   }
// };
// request(options, function(err, res, body) {
//   if (error || res.statusCode !== 200 || !body) {
//     console.error(res.statusCode)
//     console.error(body)
//     process.exit()
//   }
//
//   const filename = `whitepapers/${result.name}-${result.code}-whitepaper`
// })
