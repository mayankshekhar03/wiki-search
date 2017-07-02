

$(document).ready(function(){
   $("#search-button").click(function(){
        var q = $('#search-input').val();
        $.ajax({
              url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + q + "&prop=info&inprop=url&utf8=&format=json",
              dataType: 'jsonp',
              success: function (x) {
                  for (var i = 0; i < x.query.search.length; i++){
                    $(".results").append('<a href="https://en.wikipedia.org/wiki/' + x.query.search[i].title + '">Open</a><br>' + x.query.search[i].snippet + '<hr>');
                  }
              }
        });
    });
      /*  $.ajax({
          url: 'http://en.wikipedia.org/w/api.php',
          data: { action: 'query', list: 'search', srsearch: 'Richard Feynman', format: 'json' },
          dataType: 'jsonp',
          success: function (x) {
            $(".results").append(x.query.search[0].snippet);
          }
        }); */
});