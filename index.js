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
document.getElementById("botao_pesquisar").addEventListener("click", function (event) {
    event.preventDefault()
});
console.log('Está rodando!')

$('#botao_pesquisar').click(function (event) {
    var pesquisa = $('#pesquisa_input').val()
    console.log(pesquisa)
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Titles?name=${pesquisa}`,
        type: 'GET',
        crossDomain: true,
        async: false,
         success: (function (msg) {
            var id_filme = msg[0].Id
            console.log(id_filme)
            id = id_filme;
        })
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
            $("#body_1").html(descricao)
            $("#body_2").html(data_lancamento)
            $("#body_3").html(duration)
            $("#body_4").html(rating)
            $("#body_5").html(type)
            actors.forEach(element => {

                $("#body_6").html(element.Name)
 

            });
            directors.forEach(element => {
                $("#body_7").html(element.Name)

            });
            categories.forEach(element => {
                $("#body_8").html(element.Name)

            });
        },
        error: () => {
          
        }
    });
    $('#dados').removeClass('d-none');



})