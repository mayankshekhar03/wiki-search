

$(document).ready(function(){
    $(".footer, .results, .query").addClass("animated fadeInDown");
    $("input").focus();
    $(".res").hide();
    $("#search-button").click(function(e){
        $(".before").removeClass("before");
        e.preventDefault();  // this shit was causing the api to not load any results wtf
        var q = $('#search-input').val();
        showResults(q);
    });
    function showError(key) {
        $(".results").html("<p>Sorry the requested keyword " + key + " didn't return any results. Try one of the following actions:<ul><li>Try making the keyword more general.</li><li>Try other variants for the keyword.</li></ul></p>")
    }
    $("input").keyup(function(){
        //$(".res").html($("input").val()); test passed
        var qtemp = $("input").val();
        $(".res").show();
        showSuggestions(qtemp);
    });
    
    function showResults(qu) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + qu.toString() + "&prop=info&inprop=url&utf8=&format=json",
            dataType: 'jsonp',
            success: function (x) {
                $(".results").html("");
                $(".res").hide();
                if (x.query.searchinfo.totalhits === 0) {
                    showError(qu);
                } else {
                    for (var i = 0; i < x.query.search.length; i++){
                        $(".results").append('<a href="https://en.wikipedia.org/wiki/' + x.query.search[i].title + '" target="_blank">' + '<div class="result animated fadeInUp"><em>' + x.query.search[i].title  +'</em><br><br>' + x.query.search[i].snippet + ' ... Read more' + '<br>' + '<br><span class="md"> Wordcount: ' + x.query.search[i].wordcount + '</span>' + '</div>' + '</a>');
                    }
                }
                console.log(x.query.search[1]);
            },
            error: function(){alert('Error retrieving data. Please try again later.');}
        });
    }
    
    function showSuggestions (qu) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + qu.toString() + "&prop=info&inprop=url&utf8=&format=json",
            dataType: 'jsonp',
            success: function (x) {
                $(".res").html("");
                if (x.query.searchinfo.totalhits === 0) {
                    $(".res").html("<div>No Results</div>");
                } else {
                    for (var i = 0; i < x.query.search.length; i++){
                        $(".res").append('<div id="'+ i +'">' + x.query.search[i].title  +'</div>');
                    }
                }
                console.log(x.query.search[1]);
            }
        });
    }
    
    $('.res').bind('click', function(event) {
        var qu = $('#' + event.target.id).text();
        $('.res').hide();
        $(".before").removeClass("before");
        $("input").val(qu);
        showResults(qu);
    });
});