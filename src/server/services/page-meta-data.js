import request from 'request';
import cheerio from 'cheerio';

export default function create() {

  return function(uri, callback) {
    request({ uri }, function (error, response, body) {

      if (error) return callback(error);

      let $ = cheerio.load(body);

      let nodes = {
        image: $("meta[property='og:image']"),
        title: $("meta[property='og:title']"),
        description: $("meta[property='og:description']")
      };

      let result = {};

      if (nodes.image.length === 1) {
        result.image = nodes.image[0].attribs["content"]
      }
      if (nodes.title.length === 1) {
        result.title = nodes.title[0].attribs["content"]
      }
      if (nodes.description.length === 1) {
        result.description = nodes.description[0].attribs["content"]
      }

      callback(null, result);
    });
  }
}


// started with `$ node <FILENAME>`
if (require.main === module) {
  create()('http://www.engadget.com/2015/07/26/welcome-back-to-the-after-math/', (err, res) => {
    console.log("-- result", res);
  });
}