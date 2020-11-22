function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

export default class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  get(endpoint, params, header) {
    return this.httpRequest("GET", this.baseUrl + endpoint, params, header);
  }

  post(endpoint, params, header) {
    return this.httpRequest("POST", this.baseUrl + endpoint, params, header);
  }

  async httpRequest(method, url, params, header = null) {
    return new Promise((resolve, reject) => {
      let body, headers;
      if (method == "GET") {
        headers = header;
        // console.log(url);
      } else {
        header = { "X-CSRFToken": getCookie("csrftoken") };
        // console.log(getCookie("csrftoken"));
        body = JSON.stringify(params);
      }

      $.ajax({
        type: method,
        url: url,
        headers: header,
        data: { data: body },
        error: function () {
          console.log("ERR: Failed to load data from the server");
        },
        success: function (response) {
          resolve(response);
        },
      });
    });
  }
}
