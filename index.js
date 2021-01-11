function show(event) {
    var id = 0;
    switch (event) {
        case 'comedia':
            id = 3
            break;
        case 'scifi':
            id = 11
            break;
        case 'acao':
            id = 1
            break;
        case 'documentario':
            id = 13
            break;
        case 'drama':
            id = 4
            break;
        case 'terror':
            id = 9
            break;
        case 'romance':
            id = 12
            break;
        case 'anime':
            id = 20
            break;
        case 'kids':
            id = 21
            break;
        case 'suspense':
            id = 10
            break;
    }
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Categories/${id}`,
        type: 'GET',
        crossDomain: true,
        async: false,
    }).done(function (msg) {
        for (var i = 0; i < 50; i++) {
            var nome_filme = msg.Titles[i].Name
            console.log(nome_filme)
        }
        console.log(msg)

    })
}
var pesquisa_ator = '';
var pesquisa_anterior = '';
var pesquisa_diretor = '';

$().ready(function () {
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Statistics`,
        type: 'GET',
        crossDomain: true,
        async: false,

    }).done(function (msg) {
        $('#card_1').html(msg.Titles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
        $('#card_2').html(msg.Actors.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
        $('#card_3').html(msg.Directors.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
        $('#card_4').html(msg.Countries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    })
    //API PARA O MTDB 92f029772ce90437c0b15ee1c2488cf3
    jQuery.support.cors = true;
    var id = 0;
    var rating;
    var duration;
    var data_lancamento;
    var descricao;
    var actors;
    var categories;
    var directors;
    var type;
    var title;
    document.getElementById("botao_pesquisar").addEventListener("click", function (event) {
        event.preventDefault()
    });

    var filme_radio = document.getElementById('filme_radio')
    var ator_radio = document.getElementById('ator_radio')
    var diretor_radio = document.getElementById('diretor_radio')

    $('#botao_pesquisar').click(function (event) {
        var pesquisa = $('#pesquisa_input').val()
        if (filme_radio.checked == true) {
            $('#dados').addClass('d-none');
            $('#dados3').addClass('d-none');
            $('#dados2').addClass('d-none');
            $.ajax({
                url: `http://192.168.160.58/netflix/api/Search/Titles?name=${pesquisa}`,
                type: 'GET',
                crossDomain: true,
                async: false,

            }).done(function (msg) {
                var id_filme = msg[0].Id
                id = id_filme;
            })

            $.ajax({
                url: `http://192.168.160.58/netflix/api/Titles/${parseInt(id)}`,
                type: 'GET',
                crossDomain: true,
                async: false,
                success: function (res) {

                    descricao = res.Description
                    data_lancamento = res.ReleaseYear
                    duration = res.Duration
                    rating = res.Rating.Id
                    actors = res.Actors
                    directors = res.Directors
                    categories = res.Categories
                    type = res.Type.Name
                    title = res.Name
                    $("#title").html(title + '<br>Description')
                    $("#body_1").html(descricao)
                    $("#body_2").html(data_lancamento)
                    $("#body_3").html(duration)
                    $("#body_4").html(rating)
                    $("#body_5").html(type)
                    actors.forEach(element => {
                        $("#body_6").html($("#body_6").html() + '<li>' + element.Name + '</li>')

                    });
                    directors.forEach(element => {

                        $("#body_7").html($("#body_7").html() + '<li>' + element.Name + '</li>')
                        console.log(element.Name)

                    });
                    categories.forEach(element => {
                        $("#body_8").html($("#body_8").html() + '<li>' + element.Name + '</li>')

                        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=92f029772ce90437c0b15ee1c2488cf3&query=" + pesquisa + "&callback=?", function (json) {
                            if ((json != "Nothing found.") && (json.results[0].original_title == title)) {
                                console.log(json);
                                $('#poster').html('</p><img style="display:block; margin: 0 auto; widht:auto; height:auto;  max-width:300px;" src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
                            }
                        })
                    });
                },

            });
            $('#dados').removeClass('d-none');

        }

        if (ator_radio.checked == true) {
            $('#dados').addClass('d-none');
            $('#dados2').addClass('d-none');
            $('#dados3').addClass('d-none');
            $.ajax({
                url: `http://192.168.160.58/netflix/api/Search/Actors?name=${pesquisa}`,
                type: 'GET',
                crossDomain: true,
                async: false,

            }).done(function (msg) {
                var id_actor = msg[0].Id

                id = id_actor;
            })

            $.ajax({
                url: `http://192.168.160.58/netflix/api/Actors/${parseInt(id)}`,
                type: 'GET',
                crossDomain: true,
                async: false,
                success: function (res) {

                    var actors_movies = res.Titles
                    if ((res.Name + ' Movies') != $('#title2').html()) {
                        $('#body_9').html('')
                        actors_movies.forEach(element => {
                            $('#body_9').html($('#body_9').html() + '<li>' + element.Name + '</li>')
                            $('#title2').html(res.Name + ' Movies')
                        })
                    }
                    $.getJSON("https://api.themoviedb.org/3/search/person?api_key=92f029772ce90437c0b15ee1c2488cf3&query=" + pesquisa + "&callback=?", function (json) {
                        if ((json != "Nothing found.") && (json.results[0].name == res.Name)) {
                            console.log(json);
                            $('#poster2').html('</p><img style="display:block; margin: 0 auto; widht:auto; height:auto;  max-width:300px;" src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].profile_path + '\" class=\"img-responsive\" >');
                        }
                    })
                    $('#dados2').removeClass('d-none');

                }
            })

        }

        if (diretor_radio.checked == true) {
            $('#dados').addClass('d-none');
            $('#dados3').addClass('d-none');
            $('#dados2').addClass('d-none');
            $.ajax({
                url: `http://192.168.160.58/netflix/api/Search/Directors?name=${pesquisa}`,
                type: 'GET',
                crossDomain: true,
                async: false,

            }).done(function (msg) {
                var id_director = msg[0].Id

                console.log(id_director)
                id = id_director;

            })

            $.ajax({
                url: `http://192.168.160.58/netflix/api/Directors/${parseInt(id)}`,
                type: 'GET',
                crossDomain: true,
                async: false,
                success: function (res) {

                    console.log(res)
                    var director_movies = res.Titles
                    if ((res.Name + ' Movies') != $('#title3').html()) {
                        director_movies.forEach(element => {
                            $('#body_10').html($('#body_10').html() + '<li>' + element.Name + '</li>')
                            $('#title3').html(res.Name + ' Movies')

                        })
                        $.getJSON("https://api.themoviedb.org/3/search/person?api_key=92f029772ce90437c0b15ee1c2488cf3&query=" + pesquisa + "&callback=?", function (json) {
                            if ((json != "Nothing found.") && (json.results[0].name == res.Name)) {
                                console.log(json);
                                $('#poster3').html('</p><img style="display:block; margin: 0 auto; widht:auto; height:auto;  max-width:300px;" src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].profile_path + '\" class=\"img-responsive\" >');
                            }
                        })

                        $('#dados3  ').removeClass('d-none');

                    }

                }

            })
        }

    })

})