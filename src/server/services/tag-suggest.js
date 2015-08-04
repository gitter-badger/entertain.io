import request from 'request';
import url from 'url';
import {parseString} from 'xml2js';

export default function create() {

  function getSuggest(uri, callback) {
    request("https://entertainio:wiwroQlK@api.del.icio.us/v1/posts/suggest?red=api&url="+uri, (error, response, body) => {

      parseString(body, (err, res) => {
        //console.log("res", JSON.stringify(res, " ", 2));

        if (res.result && res.result['$'].code == 'no suggestions')
          return callback(new Error('no suggestions'));

        return callback(null, {
          popular : res.suggest.popular.map((n) => n['$'].tag),
          recommended : res.suggest.recommended.map((n) => n['$'].tag)
        });
      });

    });
  }

  return function(uri, callback) {
     getSuggest(uri, (err, res) => {
       if (!err) return callback(null, res);
       else getSuggest(url.parse(uri).hostname, callback); // get suggestions for hosturl
     });
  }
}

// started with `$ node <FILENAME>`
if (require.main === module) {

  create()('http://www.engadget.com/2015/07/26/welcome-back-to-the-after-math/', (err, res) => {
    console.log("-- result", err, res);
  });

  //create()('http://www.engadget.com/', (err, res) => {
  //  console.log("-- result", res);
  //});
}
