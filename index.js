//API PARA O MTDB 92f029772ce90437c0b15ee1c2488cf3
jQuery.support.cors = true;
var id = 0;
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
        async: false
    })
        .done(function (msg) {
            var id_filme = msg[0].Id
            console.log(id_filme)
            id = id_filme;
            console.log(typeof(id))
        })
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Titles/${parseInt(id)}`,
        type: 'GET',
        success: function (res) {
            console.log(res);
        }
    });
})