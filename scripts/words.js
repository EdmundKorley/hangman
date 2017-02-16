class Words {
  constructor(input) {
    if (typeof input === "string") {
      this.API = input;
      this.pullWords = this.grabFromAPI || this.grabFromIframe;
    } else {
      this.pullWords = this.grabLocally;
    }
    this.wordsElement = document.getElementById("words");
  }
  // A hack to bypass CORS being disabled on the server by using an iframe
  makeIframe(config) {
    this.wordsElement.innerHTML = `<iframe src="http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words${makeQueryString(config)}" id="renderedWords"></iframe>`;
  }
  grabFromIframe(config) {
    this.makeIframe(config);
    let iframeDiv = document.getElementById("renderedWords");
    console.log(iframeDiv);
  }
}

// Helper for generating complaint query params
function makeQueryString(configObject) {
  let params = []
  for (let key in configObject) {
    if (configObject.hasOwnProperty(key)) {
      params.push(key + "=" + configObject[key]);
    }
  }
  return "?" + params.join("&");
}
