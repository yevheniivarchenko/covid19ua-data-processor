const https = require('https')
const fs = require('fs')

function getRemoteFile(file, url) {
    let localFile = fs.createWriteStream(file)
    const request = https.get(url, function(response) {
        var len = parseInt(response.headers['content-length'], 10)
        var cur = 0
        var total = len / 1048576
        var dir = 'local-csv'

        response.on('data', function(chunk) {
            cur += chunk.length
            showProgress(file, cur, len, total)
        })

        response.on('end', function() {
            console.log('Download complete')
        })

        response.pipe(localFile)

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }

        fs.rename('temp.csv', `${dir}/covid19_by_settlement_actual.csv`, function (err) {
            if (err) throw err
        })
    })
}

function showProgress(file, cur, len, total) {
    console.log('Downloading ' + file + ' - ' + (100.0 * cur / len).toFixed(2) 
        + '% (' + (cur / 1048576).toFixed(2) + ' MB) of total size: ' 
        + total.toFixed(2) + ' MB')
}

var targets = [
    {
        file: 'temp.csv',
        url: 'https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_settlement_actual.csv'
    },
]

targets.forEach(function(item) {
    getRemoteFile(item.file, item.url)
})

// fs.unlink(`${__dirname}/temp.csv`, function (err) {
//     if (err) throw err
// });