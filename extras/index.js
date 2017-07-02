

$(document).ready(function(){
   $("#search-button").click(function(e){
        e.preventDefault();  // this shit was causing the api to not load any results wtf
        q = $('#search-input').val();
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + q.toString() + "&prop=info&inprop=url&utf8=&format=json",
            dataType: 'jsonp',
            success: function (x) {
              for (var i = 0; i < x.query.search.length; i++){
                $(".results").append('<a href="https://en.wikipedia.org/wiki/' + x.query.search[i].title + '">Open</a><br>' + x.query.search[i].snippet + '<hr>');
              }
            },
            error: function(){alert('error retrieving data.');}
        });
    });
});