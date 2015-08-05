import request from 'request';

export default function create() {

  return function(url, callback) {
    request({
      method: 'GET',
      uri : 'https://free.sharedcount.com/url',
      qs : {
        apikey : 'fa7356e9812ea1d531187410d1fc02a41c04ac51',
        url
      },
      json : true
    }, (error, response, body) => {
        callback(error, body);
    });
  }
}

// started with `$ node <FILENAME>`
if (require.main === module) {

  create()('http://www.engadget.com/2015/07/26/welcome-back-to-the-after-math/', (err, res) => {
    console.log("-- result", err, res);
  });

}
