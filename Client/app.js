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
                $("#my-form").empty();
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

function PopulateAddForm(){
    $("#my-form").html('<input type="text" name="title" placeholder="Title"/><input type="text" name="genre" placeholder="Genre"/><input type="text" name="director" placeholder="Director"/><button type="submit">Submit</button>')
}   


function GetAllMovies(){

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $("#allMoviesButton").css("visibility", "hidden");
                $("#addMovieButton").css("visibility", "visible");
                $("#movieImage").empty();
               PrintMovieTable(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }

    function PrintMovieTable(data){
        $("#movieTable").html("");
        $("#movieTable").append('<table><tr><th>Movie Title</th><th>Genre</th><th>Director</th><th>Edit Movie</th><th>Delete Movie</th><th>Movie Details</th></tr></table>');
        for(let i = 0; i < data.length; i++){
                $("#movieTable").append('<tr><td>'+data[i].title+
                    '</td><td>'+data[i].genre+
                    '</td><td>'+data[i].director+
                    '</td><td><a href="javascript:EditMovie('+data[i].movieId+')">Edit</a></td><td><a href="javascript:DeleteMovie('+data[i].movieId+')">Delete</a></td><td><a href="javascript:ShowDetails('+data[i].movieId+')">Details</a></td></tr>');
        }
        
    }

    function EditMovie(movieId){
       
        $.ajax({
            url: 'https://localhost:44325/api/movie/'+movieId,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $("#movieTable").empty();
                $("#addMovieButton").css("visibility", "hidden");
                PopulateEditForm(data);
                UpdateMovie(data);
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
                $("#edit-form").empty();
                GetAllMovies();
                $("#addMovieButton").css("visibility", "visible");
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
            let choice = promptFor("Enter yes to delete "+data.title+"?", yesNo).toLowerCase();
            switch(choice){
                case 'yes':
                    DeleteMovieCall(data);
                    break;
                default:
                    break;

            }
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
            GetAllMovies();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function ShowDetails(movieId){
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+movieId,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $("#movieTable").empty();
            $("#addMovieButton").css("visibility", "hidden");
            ShowMovieDetails(data);
            
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function ShowMovieDetails(movie){
    $("#movieTable").html("");
    $("#movieTable").append('<table><tr><th>Movie Title</th><th>Genre</th><th>Director</th><th>Edit Movie</th><th>Delete Movie</th></tr></table>');
    $("#movieTable").append('<tr><td>'+movie.title+
                    '</td><td>'+movie.genre+
                    '</td><td>'+movie.director+
                    '</td><td><a href="javascript:EditMovie('+movie.movieId+')">Edit</a></td><td><a href="javascript:DeleteMovie('+movie.movieId+')">Delete</a></td></tr>');
            CallImageApi(movie.title);
    
    $("#allMoviesButton").css("visibility", "visible");
}

function CallImageApi(title){
    $.ajax({
        url:  `http://www.omdbapi.com/?t=${title}&apikey=ec1ddfc7`,
        dataType: 'jsonp',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);
            console.log(data.Poster);
            $("#movieImage").append('<img src='+data.Poster+' alt='+title+'></img>');

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

  $(document).ready(GetAllMovies());