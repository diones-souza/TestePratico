function setDatePicker(input, idStart, idEnd, idDays) {
    //inicia daterange no input
    $(input).daterangepicker(settingsDataRange(),
        function (start, end) {
            //mudar valor dos campos periodo
            setDateValue(idStart, start)
            setDateValue(idEnd, end)
            $(idDays).html(end.diff(start, 'days') + " dias")
            if(validateSplitPeriod()){
                //validar regras de fim de semana e feriados
                validateWeekend()
            }
        }
    )
}
//definir valor da data
function setDateValue(id, date) {
    $(id).val(date.format('DD/MM/YYYY'))
}
// validar fim de semana
function validateWeekend(){
    const splitPeriod = $('#splitPeriod').val()
    //validar periodos
    if(splitPeriod == 1){
        const oneDateStart = moment($('#oneDateStart').val(), 'DD').weekday()
        if( oneDateStart > 0 && oneDateStart < 5){
            return true
        }else {
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
    }
    if(splitPeriod == 2){
        const oneDateStart = moment($('#oneDateStart').val(), 'DD').weekday()
        const twoDateStart = moment($('#twoDateStart').val(), 'DD').weekday()
        if(oneDateStart > 0 && oneDateStart < 5){
            if(twoDateStart > 0 && twoDateStart < 5){
                return true
            }
        }else {
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
        if(twoDateStart > 4){
            $('#twoSplitPeriodError').removeClass('d-none')
            $('#twoSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
    }
    if(splitPeriod == 3){
        const oneDateStart = moment($('#oneDateStart').val(), 'DD')
        const twoDateStart = moment($('#twoDateStart').val(), 'DD')
        const threeDateEnd = moment($('#threeDateEnd').val(), 'DD')
        if(oneDateStart.weekday() < 5){
            validated = true
        }else {
            validated = false
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
        if(twoDateStart.weekday() < 5){
            validated = true
        }else {
            validated = false
            $('#twoSplitPeriodError').removeClass('d-none')
            $('#twoSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
        if(threeDateEnd.weekday() < 5){
            validated = true
        }else {
            validated = false
            $('#threeSplitPeriodError').removeClass('d-none')
            $('#twoSplitPeriodError').html('O período deve iniciar de segunda a quinta')
        }
    }
    return false
}
//validar padroes dos periodos divididos
function validateSplitPeriod(){
    let validated = false
    const splitPeriod = $('#splitPeriod').val()
    //validar periodos
    if(splitPeriod == 1){
        validated = splitPeriodValidation({
            splitPeriod:splitPeriod,
            oneIdStart:'#oneDateStart', 
            oneIdEnd:'#oneDateEnd'
        })
    }
    if(splitPeriod == 2){
        validated = splitPeriodValidation({
            splitPeriod:splitPeriod,
            oneIdStart:'#oneDateStart', 
            oneIdEnd:'#oneDateEnd',
            twoIdStart:'#twoDateStart', 
            twoIdEnd:'#twoDateEnd'
        })
    }
    if(splitPeriod == 3){
        validated = splitPeriodValidation({
            splitPeriod:splitPeriod,
            oneIdStart:'#oneDateStart', 
            oneIdEnd:'#oneDateEnd',
            twoIdStart:'#twoDateStart', 
            twoIdEnd:'#twoDateEnd',
            threeIdStart:'#threeDateStart', 
            threeIdEnd:'#threeDateEnd',
        })
    }
    return validated
}
//validar regras
function splitPeriodValidation(filter) {
    //ocutar span de mensagens
    $('#splitPeriodError').addClass('d-none')
    $('#oneSplitPeriodError').addClass('d-none')
    $('#twoSplitPeriodError').addClass('d-none')
    $('#threeSplitPeriodError').addClass('d-none')
    //regras para ferias completa
    if (filter.splitPeriod == 1) {
        //pegar data de inicio e fim
        const oneDateStart = moment($(filter.oneIdStart).val(), 'DD/MM/YYYY')
        const oneDateEnd = moment($(filter.oneIdEnd).val(), 'DD/MM/YYYY')
        //verificar se as datas são validas
        if (oneDateStart._isValid && oneDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            const oneDiff = parseInt(oneDateEnd.diff(oneDateStart, 'days'))
            //ferias completa deve ter 30 dias
            if (oneDiff == 30) {
                return true
            } else {
                $('#oneSplitPeriodError').removeClass('d-none')
                $('#oneSplitPeriodError').html('O período deve ser 30 dias')
            }
        } else {
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('Informe o período')
        }
    }
    if (filter.splitPeriod == 2) {
        //pegar data de inicio e fim
        const oneDateStart = moment($(filter.oneIdStart).val(), 'DD/MM/YYYY')
        const oneDateEnd = moment($(filter.oneIdEnd).val(), 'DD/MM/YYYY')
        let oneDiff = 0
        //verificar se as datas são validas
        if (oneDateStart._isValid && oneDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            oneDiff = parseInt(oneDateEnd.diff(oneDateStart, 'days'))
            //regra de ferias dividas não deve ter periodo maior que 20 dias
            if (oneDiff > 20) {
                $('#oneSplitPeriodError').removeClass('d-none')
                $('#oneSplitPeriodError').html('O período execede o limite de 20 dias')
            }
        } else {
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('Informe o período')
        }
        //pegar data de inicio e fim
        const twoDateStart = moment($(filter.twoIdStart).val(), 'DD/MM/YYYY')
        const twoDateEnd = moment($(filter.twoIdEnd).val(), 'DD/MM/YYYY')
        let twoDiff = 0
        //verificar se as datas são validas
        if (twoDateStart._isValid && twoDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            twoDiff = parseInt(twoDateEnd.diff(twoDateStart, 'days'))
            //regra de ferias dividas não deve ter periodo maior que 20 dias
            if (twoDiff > 20) {
                $('#twoSplitPeriodError').removeClass('d-none')
                $('#twoSplitPeriodError').html('O período execede o limite de 20 dias')
            }
        } else {
            $('#twoSplitPeriodError').removeClass('d-none')
            $('#twoSplitPeriodError').html('Informe o período')
        }
        //calcular periodos para saber se sao distintos
        const oneTwoDiff = parseInt(twoDateStart.diff(oneDateEnd, 'days'))
        //regra de ferias dividas não deve ter periodo maior que 20 dias e um dos peridos deve ter no minimo 14 dias 
        if (oneDiff >= 14 && oneDiff <= 20) {
            //soma os dias dos periodos
            const sum = oneDiff + twoDiff
            //ferias completa deve ter 30 dias
            if (sum == 30) {
                //verificar se os periodos sao distintos
                if (oneTwoDiff > 0) {
                    return true
                } else {
                    $('#splitPeriodError').removeClass('d-none')
                    $('#splitPeriodError').html('Os períodos deve ser distintos (segundo período deve iniciar somente após o primeiro)')
                }
            } else {
                $('#splitPeriodError').removeClass('d-none')
                if (sum > 30) {
                    $('#splitPeriodError').html('Os períodos execede o limite de 30 dias')
                } else {
                    $('#splitPeriodError').html('Os períodos deve ter 30 dias')
                }
            }
        } else {
            //regra de ferias dividas não deve ter periodo maior que 20 dias e um dos peridos deve ter no minimo 14 dias 
            if (twoDiff >= 14 && twoDiff <= 20) {
                //soma os dias dos periodos
                const sum = oneDiff + twoDiff
                //ferias completa deve ter 30 dias
                if (sum == 30) {
                    //verificar se os periodos sao distintos
                    if (oneTwoDiff > 0) {
                        return true
                    } else {
                        $('#splitPeriodError').removeClass('d-none')
                        $('#splitPeriodError').html('Os períodos deve ser distintos')
                    }
                } else {
                    $('#splitPeriodError').removeClass('d-none')
                    if (sum > 30) {
                        $('#splitPeriodError').html('Os períodos execede o limite de 30 dias')
                    } else {
                        $('#splitPeriodError').html('O total dos períodos deve ter 30 dias')
                    }
                }
            } else {
                $('#splitPeriodError').removeClass('d-none')
                $('#splitPeriodError').html('Um dos períodos deve ter no mínimo 14 dias e no máximo 20 dias')
            }
        }
    }
    if (filter.splitPeriod == 3) {
        //pegar data de inicio e fim
        const oneDateStart = moment($(filter.oneIdStart).val(), 'DD/MM/YYYY')
        const oneDateEnd = moment($(filter.oneIdEnd).val(), 'DD/MM/YYYY')
        let oneDiff = 0
        //verificar se as datas são validas
        if (oneDateStart._isValid && oneDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            oneDiff = parseInt(oneDateEnd.diff(oneDateStart, 'days'))
            //regra de ferias dividas não deve ter periodo menor que 5 dias
            if (oneDiff < 5) {
                $('#oneSplitPeriodError').removeClass('d-none')
                $('#oneSplitPeriodError').html('O período deve ter no mínimo 5 dias')
            }
            //regra de ferias dividas não deve ter periodo maior que 20 dias
            if (oneDiff > 20) {
                $('#oneSplitPeriodError').removeClass('d-none')
                $('#oneSplitPeriodError').html('O período execede o limite de 20 dias')
            }
        } else {
            $('#oneSplitPeriodError').removeClass('d-none')
            $('#oneSplitPeriodError').html('Informe o período')
        }
        //pegar data de inicio e fim
        const twoDateStart = moment($(filter.twoIdStart).val(), 'DD/MM/YYYY')
        const twoDateEnd = moment($(filter.twoIdEnd).val(), 'DD/MM/YYYY')
        let twoDiff = 0
        //verificar se as datas são validas
        if (twoDateStart._isValid && twoDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            twoDiff = parseInt(twoDateEnd.diff(twoDateStart, 'days'))
            //regra de ferias dividas não deve ter periodo menor que 5 dias
            if (twoDiff < 5) {
                $('#twoSplitPeriodError').removeClass('d-none')
                $('#twoSplitPeriodError').html('O período deve ter no mínimo 5 dias')
            }
            //regra de ferias dividas não deve ter periodo maior que 20 dias
            if (twoDiff > 20) {
                $('#twoSplitPeriodError').removeClass('d-none')
                $('#twoSplitPeriodError').html('O período execede o limite de 20 dias')
            }
        } else {
            $('#twoSplitPeriodError').removeClass('d-none')
            $('#twoSplitPeriodError').html('Informe o período')
        }
        //pegar data de inicio e fim
        const threeDateStart = moment($(filter.threeIdStart).val(), 'DD/MM/YYYY')
        const threeDateEnd = moment($(filter.threeIdEnd).val(), 'DD/MM/YYYY')
        let threeDiff = 0
        //verificar se as datas são validas
        if (threeDateStart._isValid && threeDateEnd._isValid) {
            //calcular quantidade de dias entre a data de inicio e fim
            threeDiff = parseInt(threeDateEnd.diff(threeDateStart, 'days'))
            //regra de ferias dividas não deve ter periodo menor que 5 dias
            if (threeDiff < 5) {
                $('#threeSplitPeriodError').removeClass('d-none')
                $('#threeSplitPeriodError').html('O período deve ter no mínimo 5 dias')
            }
            //regra de ferias dividas não deve ter periodo maior que 20 dias
            if (threeDiff > 20) {
                $('#threeSplitPeriodError').removeClass('d-none')
                $('#threeSplitPeriodError').html('O período execede o limite de 20 dias')
            }
        } else {
            $('#threeSplitPeriodError').removeClass('d-none')
            $('#threeSplitPeriodError').html('Informe o período')
        }
        //calcular periodos para saber se sao distintos
        const oneTwoDiff = parseInt(twoDateStart.diff(oneDateEnd, 'days'))
        const twoThreeDiff = parseInt(threeDateStart.diff(twoDateEnd, 'days'))
        //regra de ferias dividas não deve ter periodo maior que 20 dias e um dos peridos deve ter no minimo 14 dias 
        if (oneDiff >= 14 && oneDiff <= 20) {
            //soma os dias dos periodos
            const sum = oneDiff + twoDiff + threeDiff
            //ferias completa deve ter 30 dias
            if (sum == 30) {
                //verificar se os periodos sao distintos
                if (oneDiff >= 5 && twoDiff >= 5 && threeDiff >= 5) {
                    if (oneTwoDiff > 0) {
                        if (twoThreeDiff > 0) {
                            return true
                        } else {
                            $('#splitPeriodError').removeClass('d-none')
                            $('#splitPeriodError').html('Os períodos deve ser distintos (terceiro período deve iniciar somente após o segundo)')
                        }
                    } else {
                        $('#splitPeriodError').removeClass('d-none')
                        $('#splitPeriodError').html('Os períodos deve ser distintos (segundo período deve iniciar somente após o primeiro)')
                    }
                }
            } else {
                $('#splitPeriodError').removeClass('d-none')
                if (sum > 30) {
                    $('#splitPeriodError').html('Os períodos execede o limite de 30 dias')
                } else {
                    $('#splitPeriodError').html('O total dos períodos deve ter 30 dias')
                }
            }
        } else {
            //regra de ferias dividas não deve ter periodo maior que 20 dias e um dos peridos deve ter no minimo 14 dias 
            if (twoDiff >= 14 && twoDiff <= 20) {
                //soma os dias dos periodos
                const sum = oneDiff + twoDiff + threeDiff
                //ferias completa deve ter 30 dias
                if (sum == 30) {
                    //verificar se os periodos sao distintos
                    if (oneDiff >= 5 && twoDiff >= 5 && threeDiff >= 5) {
                        if (oneTwoDiff > 0) {
                            if (twoThreeDiff > 0) {
                                return true
                            } else {
                                $('#splitPeriodError').removeClass('d-none')
                                $('#splitPeriodError').html('Os períodos deve ser distintos (terceiro período deve iniciar somente após o segundo)')
                            }
                        } else {
                            $('#splitPeriodError').removeClass('d-none')
                            $('#splitPeriodError').html('Os períodos deve ser distintos (segundo período deve iniciar somente após o primeiro)')
                        }
                    }
                } else {
                    $('#splitPeriodError').removeClass('d-none')
                    if (sum > 30) {
                        $('#splitPeriodError').html('Os períodos execede o limite de 30 dias')
                    } else {
                        $('#splitPeriodError').html('O total dos períodos deve ter 30 dias')
                    }
                }
            } else {
                if (threeDiff >= 14 && threeDiff <= 20) {
                    //soma os dias dos periodos
                    const sum = oneDiff + twoDiff + threeDiff
                    //ferias completa deve ter 30 dias
                    if (sum == 30) {
                        //verificar se os periodos sao distintos
                        if (oneDiff >= 5 && twoDiff >= 5 && threeDiff >= 5) {
                            if (oneTwoDiff > 0) {
                                if (twoThreeDiff > 0) {
                                    return true
                                } else {
                                    $('#splitPeriodError').removeClass('d-none')
                                    $('#splitPeriodError').html('Os períodos deve ser distintos (terceiro período deve iniciar somente após o segundo)')
                                }
                            } else {
                                $('#splitPeriodError').removeClass('d-none')
                                $('#splitPeriodError').html('Os períodos deve ser distintos (segundo período deve iniciar somente após o primeiro)')
                            }
                        }
                    } else {
                        $('#splitPeriodError').removeClass('d-none')
                        if (sum > 30) {
                            $('#splitPeriodError').html('Os períodos execede o limite de 30 dias')
                        } else {
                            $('#splitPeriodError').html('O total dos períodos deve ter 30 dias')
                        }
                    }
                } else {
                    $('#splitPeriodError').removeClass('d-none')
                    $('#splitPeriodError').html('Um dos períodos deve ter no mínimo 14 dias e no máximo 20 dias')
                }
            }
        }
    }
    return false
}
// buscar cidades
// param uf (codigo ibge do estado)
// param cache (boolean que indica se vai limpar o campo cidades)
function getCities(uf, cache = false) {
    let city = $('#city').val()
    cache ? $('#cities').html('<option selected disabled>Selecione a cidade</option>') : null
    //faz consulta para trazer os municipios de um estado especificado
    $.ajax({
        url: "/Person/cities",
        data: `uf=${uf}`,
        dataType: "json",
        success: function (data) {
            data.map(item => {
                var option = `<option value="${item.id}">${item.nome}</option>`
                $('#cities').append(option)
            })
            if (city) {
                $('#cities').val(city)
            }
        }
    })
}
// buscar estados
function getStates() {
    //pegar valor do estado
    let uf = $('#uf').val()
    //faz consulta para trazer estados
    $.ajax({
        url: "/Person/states",
        dataType: "json",
        success: function (data) {
            data.map(item => {
                var option = `<option value="${item.id}">${item.nome}</option>`
                $('#states').append(option)
            })
            if (uf) {
                getCities(uf)
                $('#states').val(uf)
            }
        }
    })
}
//configurações daterange
function settingsDataRange() {
    return {
        opens: 'right',
        drops: "up",
        locale: {
            format: "DD/MM/YYYY",
            separator: " a ",
            applyLabel: "Ok",
            cancelLabel: "Cancelar",
            daysOfWeek: [
                "Dom",
                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sáb"
            ],
            monthNames: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            firstDay: 1
        },
    }
}

(function($){
	$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
	  if (!$(this).next().hasClass('show')) {
		$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
	  }
	  var $subMenu = $(this).next(".dropdown-menu");
	  $subMenu.toggleClass('show');

	  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
		$('.dropdown-submenu .show').removeClass("show");
	  });

	  return false;
	});
})(jQuery)