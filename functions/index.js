const functions = require("firebase-functions");
const fs = require("fs");
const http = require('http');
const https = require('https');
const axios = require('axios');
exports.host = functions.https.onRequest((request, response) => {
  const META_PLACEHOLDER = /<meta name="__REPLACE_START__"\/>.*<meta name="__REPLACE_END__"\/>/;
  let indexHTML = fs.readFileSync('./source/index.html').toString();
  const path = request.path ? request.path.split('/') : request.path;
  let customOpenGraph=''

  if(path[1] === 'post'){

    fetchGalleriesDetail(path[2])
      .then(gData=>{
        const {title, description,urls} = gData
        customOpenGraph = `
          <title>Moonshot Gallery | ${title}</title>
          <meta
            name="description"
            content="${description} "
          />
          <meta property="og:title" content="Moonshot Gallery | ${title}" />
          <meta property="og:description" content="${description} " />
          <meta property="og:image" content="${urls.thumb}" />
        `;
        indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
        response.status(200).send(indexHTML);

      })
      .catch(error=>{
        customOpenGraph = `
          <title>Moonshot | ${path[2]}</title>
          <meta
            name="description"
            content="Let Moonshot Create For You."
          />
          <meta property="og:title" content="Moonshot | ${path[2]}" />
          <meta property="og:description" content="Let Moonshot Create For You." />
          <meta property="og:image" content="logo.png" />
        `;
        indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
        response.status(200).send(indexHTML);
      })
  }else{
      customOpenGraph = `
          <title>Moonshot Gallery</title>
          <meta
            name="description"
            content="Let Moonshot Create For You."
          />
          <meta property="og:title" content="Moonshot Gallery" />
          <meta property="og:description" content="Let Moonshot Create For You." />
          <meta property="og:image" content="logo.png" />
        `;
        indexHTML = indexHTML.replace(META_PLACEHOLDER, customOpenGraph);
        response.status(200).send(indexHTML);
  }

});

const fetchGalleriesDetail = async (id) => {

  return new Promise((resolve, reject) => {
    const apiUrl = 'https://api-dev.moonshot.today/galleries/';
    const url = apiUrl + id;

    axios.get(url, { headers: { 'Content-Type': 'application/json' } })
      .then((axiosResponse) => {
        const data = axiosResponse.data;
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject('An error occurred');
      });
  });

  // const response = await fetch(apiUrl+id ,requestOptions)
  // const data = await response.json()
  // return data
}