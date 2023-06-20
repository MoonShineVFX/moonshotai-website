const functions = require("firebase-functions");
const fs = require("fs");

exports.host = functions.https.onRequest((request, response) => {
  const META_PLACEHOLDER = /<meta name="__REPLACE_START__"\/>.*<meta name="__REPLACE_END__"\/>/;
  let indexHTML = fs.readFileSync('./source/index.html').toString();
  const path = request.path ? request.path.split('/') : request.path;
  const customOpenGraph = `
      <title>Moonshot 位置在${path[2]}</title>
      <meta
        name="description"
        content="位置在${path[2]}的描述~> Ai art Linebot Group"
      />
      <meta property="og:title" content="Moonshot 位置在${path[2]}" />
      <meta property="og:description" content="針對 ${path[2]} 處理的描述 Ai art Linebot Group" />
      <meta property="og:image" content="logo.png" />
    `;
  


  indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
  response.status(200).send(indexHTML);
});

