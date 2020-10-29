(function($){
    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        
        e.preventDefault();

    }

    $('#my-form').submit( processForm );
})(jQuery);



function GetMovies(){

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                console.log("reached this point");
                console.log(data);
                console.log(["data"][0]["title"]);
                console.log(data[0].title);
                console.log(data[0])
                $("#movieTable").html("");
                $("#movieTable").append('<table><tr><th>Movie Title</th><th>Genre</th><th>Director</th></tr></table>')
                for(let i = 0; i < data.length; i++){
                        $("#movieTable").append('<tr><td>'+data[i].title+'</td><td>'+data[i].genre+'</td><td>'+data[i].director+'</td></tr>');
                }
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        // e.preventDefault();
    }(jQuery);