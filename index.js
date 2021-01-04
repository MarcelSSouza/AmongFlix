$().ready(function () {


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
            $.ajax({
                url: `http://192.168.160.58/netflix/api/Search/Titles?name=${pesquisa}`,
                type: 'GET',
                crossDomain: true,
                async: false,

            }).done(function (msg) {
                var id_filme = msg[0].Id
                console.log(id_filme)
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
                   if (filme_radio.checked == true)  title = res.Name
                    $("#title").html(title + '<br>Description')
                    $("#body_1").html(descricao)
                    $("#body_2").html(data_lancamento)
                    $("#body_3").html(duration)
                    $("#body_4").html(rating)
                    $("#body_5").html(type)
                    var actors_body = document.getElementById('body_6')
                    actors.forEach(element => {
                        actors_body.innerHTML = `<li>${element.Name}</li>`
                        console.log("🚀 ~ file: index.js ~ line 57 ~ element.Name ", element.Name)
                    });
                    directors.forEach(element => {
                        $("#body_7").html(element.Name)
                        console.log(element.Name)

                    });
                    categories.forEach(element => {
                        $("#body_8").html(element.Name)

                    });
                },

            });
            $('#dados').removeClass('d-none');
        }

        if(ator_radio.checked == true){
            $.ajax({
                url: `http://192.168.160.58/netflix/api/Search/Actors?name=${pesquisa}`,
                type: 'GET',
                crossDomain: true,
                async: false,

            }).done(function (msg) {
                var id_actor = msg[0].Id
                console.log(id_actor)
                id = id_actor;
            })

            $.ajax({
                url: `http://192.168.160.58/netflix/api/Actors/${parseInt(id)}`,
                type: 'GET',
                crossDomain: true,
                async: false,
                success: function (res) {
                   console.log(res) 
        }
        })}

        if(diretor_radio.checked == true){
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
                url: `http://192.168.160.58/netflix/api/Actors/${parseInt(id)}`,
                type: 'GET',
                crossDomain: true,
                async: false,
                success: function (res) {
                   console.log(res) 
        }
        })}
        
    










    })
});