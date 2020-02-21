// param uf (codigo ibge do estado)
// param cache (boolean que indica se vai limpar o campo cidades)
function getCities(uf,cache=false){
    let city = $('#city').val()
    cache ? $('#cities').html('<option selected>Selecione a cidade</option>') : null
    //faz consulta na api do ibge para trazer os municipios de um estado especificado
    $.ajax({
        url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
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
    //faz consulta na api do ibge para trazer estados
    $.ajax({
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
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