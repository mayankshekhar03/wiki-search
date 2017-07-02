

$(document).ready(function(){
   $(".query").addClass("animated fadeIn");
   $(".footer").addClass("animated fadeIn");

   $("#search-button").click(function(e){
        e.preventDefault();  // this shit was causing the api to not load any results wtf
        q = $('#search-input').val();
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + q.toString() + "&prop=info&inprop=url&utf8=&format=json",
            dataType: 'jsonp',
            success: function (x) {
                $(".results").html("");
                if (x.query.searchinfo.totalhits === 0) {
                    showError(q);
                } else {
                    for (var i = 0; i < x.query.search.length; i++){
                        $(".results").append('<a href="https://en.wikipedia.org/wiki/' + x.query.search[i].title + '">'+ x.query.search[i].title +'</a><br>' + x.query.search[i].snippet + '<hr>');
                    }
                }
                console.log(x.query.search[1]);
            },
            error: function(){alert('error retrieving data.');}
        });
    });
    
    function showError(key) {
        $(".results").html("<p>Sorry the requested keyword " + key + " didn't return any results. Try one of the following actions:<ul><li>Try making the keyword more general.</li><li>Try other variants for the keyword.</li></ul></p>")
    }
});