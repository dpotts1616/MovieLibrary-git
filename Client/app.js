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
                GetAllMovies();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        
        e.preventDefault();

    }

    $('#my-form').submit( processForm );
})(jQuery);



function GetAllMovies(){

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
               PrintMovieTable(data);
               $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }

    function PrintMovieTable(data){
        $("#movieTable").html("");
        $("#movieTable").append('<table><tr><th>Movie Title</th><th>Genre</th><th>Director</th><th>Edit</th><th>Delete</th></tr></table>')
        for(let i = 0; i < data.length; i++){
                $("#movieTable").append('<tr><td>'+data[i].title+
                    '</td><td>'+data[i].genre+
                    '</td><td>'+data[i].director+
                    '</td><td><a href="javascript:EditMovie('+data[i].movieId+')">Edit</a></td><td><a href="javascript:DeleteMovie('+data[i].movieId+')">Delete</a></td></tr>');//Add in delete column//possibly put edit within the line
        }
        
    }

    function EditMovie(movieId){
       
        $.ajax({
            url: 'https://localhost:44325/api/movie/'+movieId,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $("#movieTable").detach();
                PopulateEditForm(data);
                UpdateMovie(data);
               
               $('#response pre').html( data );
               
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }
     
function PopulateEditForm(movie){
    console.log(movie);
    $("#edit-form").html('<input type="hidden" name="movieId" value="'+movie.movieId+'" /><input type="text" name="title" value="'+movie.title+'"/><input type="text" name="genre" value="'+movie.genre+'"/><input type="text" name="director" value="'+movie.director+'"/><button type="submit">Submit</button>')
}    

function UpdateMovie(movie){
    function processForm( e ){
        var dict = {
            // MovieId : this["movieId"].value,
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie/'+movie.movieId,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                console.log(data);
                // $('#response pre').html( data );
                GetAllMovies();
             },
             error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
             },
        });
        e.preventDefault();
    }
    $('#edit-form').submit( processForm );

}


function DeleteMovie(movieId){
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+movieId,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            let choice = promptFor("Are you sure you want to delete "+data.title+"?", yesNo).toLowerCase();
            switch(choice){
                case 'yes':
                    DeleteMovieCall(data);
                    break;
                default:
                    break;

            }
           $('#response pre').html( data );
           
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function DeleteMovieCall(movie){
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+movie.movieId,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
            GetAllMovies();
           
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}


function promptFor(question, valid){
    do{
      var response = prompt(question)?.trim();
      if (response === ""){
        return null
      }
    } while(!response || !valid(response));
    return response.toLowerCase();
  }

function yesNo(input){
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
  }