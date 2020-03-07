//get the search terms from the input, store in variable

var numberOfArticles = 1;

function queryString() {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var queryParameters = { "api-key": "6IrupsUwKdAX6Yp4HlfCZEXtuHLv0Gt3" };

  queryParameters.q = $("#searchTerm")
    .val()
    .trim();
  var begin_date = $("#inputMDEx1");
  var end_date = $("#inputMDEx2");

  if (parseInt(begin_date)) {
    queryParameters.begin_date = begin_date;
  }
  if (parseInt(end_date)) {
    queryParameters.end_date = end_date;
  }
  return queryURL + $.param(queryParameters);
}

function renderResults(results) {
  var docs = results.docs;
  console.log(docs);
  for (var i = 0; i < docs.length; i++) {
    let imageSRC = "https://static01.nyt.com/" + docs[i].multimedia[7].url;
    var result = $("<div>");
    var image = $("<img>").attr({
      src: imageSRC
    });
    var headline = $("<h2>").text(docs[i].headline.main);
    var abstract = $("<p>").text(docs[i].abstract);
    var url = $("<p>").text(docs[i].web_url);
    var date = $("<p>").text(docs[i].pub_date);
    result.append(image);
    result.append(headline);
    result.append(abstract);
    result.append(url);
    result.append(date);
    $("#results").append(result);
  }
}

async function queryAPI(callback) {
  $.ajax({
    url: queryString(),
    method: "GET"
  }).then(function(response) {
    var results = response.response;
    callback(results);
  });
}

$("#search").submit(function(e) {
  e.preventDefault();
  queryAPI(renderResults);
});
