document.getElementById("botao_pesquisar").addEventListener("click", function (event) {
    event.preventDefault()
});
console.log('oi')
document.getElementById("botao_email").addEventListener("click", function (event) {
    event.preventDefault()
});
$('#botao_pesquisar').click(function (event) {
    var pesquisa = $('#pesquisa_input').val()
    console.log(pesquisa)
    $.ajax({
        url : `http://192.168.160.58/netflix/api/Search/Titles?name=${pesquisa}`,
        type : 'get'
   })
   .done(function(msg){
       if(msg.id)
        console.log(msg)
        var id_filme = msg.id
        console.log
        $.ajax({
            url : `http://192.168.160.58/netflix/api/Search/Titles/${id_filme}`,
            type : 'get'
       })
       .done(function(dados){
           console.log(dados)
       })
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });
})
