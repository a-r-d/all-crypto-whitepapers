const request = require('request');
const fs = require('fs');
const download = require('download-file')
const prompt = require('prompt');
const async = require('async')

prompt.start();

// sad that cryptocurrency whitepapers are served under invalid certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
