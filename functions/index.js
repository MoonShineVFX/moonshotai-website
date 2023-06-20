const functions = require("firebase-functions");
const fs = require("fs");

exports.host = functions.https.onRequest((request, response) => {
  const META_PLACEHOLDER = /<meta name="__REPLACE_START__"\/>.*<meta name="__REPLACE_END__"\/>/;
  let indexHTML = fs.readFileSync('./source/index.html').toString();
  const path = request.path ? request.path.split('/') : request.path;
  const {title, description,urls} = gData
  const customOpenGraph=``
  if(path[1] === 'post'){

    fetchGalleriesDetail(path[2])
      .then(gData=>{
        const {title, description,urls} = gData
        customOpenGraph = `
          <title>Moonshot ${title}</title>
          <meta
            name="description"
            content="${description} "
          />
          <meta property="og:title" content=">Moonshot ${title}" />
          <meta property="og:description" content="${description} " />
          <meta property="og:image" content="${urls.thumb}" />
        `;
        indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
        response.status(200).send(indexHTML);

      })
      .catch(error=>{
        customOpenGraph = `
          <title>Moonshot info error</title>
          <meta
            name="description"
            content="${error} "
          />
          <meta property="og:title" content=">Moonshot info error" />
          <meta property="og:description" content="${error} " />
        `;
        indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
        response.status(200).send(indexHTML);
      })
  }

});

const fetchGalleriesDetail = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  };
  const response = await fetch(apiUrl+'galleries/'+id ,requestOptions)
  const data = await response.json()
  return data
}