// param uf (codigo ibge do estado)
// param cache (boolean que indica se vai limpar o campo cidades)
function getCities(uf,cache=false){
    let city = $('#city').val()
    cache ? $('#cities').html('<option selected disabled>Selecione a cidade</option>') : null
    //faz consulta para trazer os municipios de um estado especificado
    $.ajax({
        url: "Person/cities",
        data:`uf=${uf}`,
        dataType: "json",
        success:function(data) {
            data.map(item =>{
                var option = `<option value="${item.id}">${item.nome}</option>`
                $('#cities').append(option)
            })
            if(city){
               $('#cities').val(city)
            }
        }
    })
}
$(function(){
    let uf = $('#uf').val()
    //faz consulta para trazer estados
    $.ajax({
        url: "Person/states",
        dataType: "json",
        success:function(data) {
            data.map(item =>{
                var option = `<option value="${item.id}">${item.nome}</option>`
                $('#states').append(option)
            })
            if(uf){
              getCities(uf)
              $('#states').val(uf)
            }
        }
    })
    $('#states').change(function(){
        getCities($('#states').val(),true)
    })
})