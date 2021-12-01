$(document).ready(function(){
    if((document.URL).indexOf('&')=='-1'){
        var itemID = (document.URL).substring((document.URL).indexOf("ID=")+3) 
    } else {
        var itemID = (document.URL).substring((document.URL).indexOf("ID=")+3,(document.URL).indexOf("&"))
    }
    postbackUrlEdit = postbackUrlEdit + itemID + '&Source=https://intranet.weg.net/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx'
    
    if((document.URL)!=postbackUrlEdit){ window.location.href = postbackUrlEdit }
    
    getAreas()
    allInputs.forEach(function(e){ TRs.push($(e)[0].parentNode.parentNode.parentNode) })
    allConvocados.forEach(function(e){ TRs.push($(e)[0].parentNode.parentNode.parentNode) })
    $($('#part1').children()[2]).html('<div id="containerConteudo" class="container"></div>');
    buildBreadCrumb()
    buildForm()
    $($("#part1").children()[3]).empty()
    inputClasses()  
    buildButtons()
    $(backButton).removeAttr('onclick').click(function(){ window.location.href = postbackCancel })
    forceChange()
}); 

//pegar Deptos e Seções
function getAreas(){
	arrayAreas = [];
    arrayAreas = GetListItems('71C0F7B3-0A22-4566-9A1D-C8292C8C9A7B', "?$top=99999", 'https://intranet.weg.net/br/');
    arrayMotores = $.grep(arrayAreas, function(e,i){;
        return e.Unidade == 'Motores Industriais'});
	arrayMotores = SortArray(arrayMotores, 'Secao');
	arrayMotores = SortArray(arrayMotores, 'Departamento');
}
function buildBreadCrumb(){
    $("#containerConteudo").append(
        '<nav aria-label="breadcrumb white-text" class="mb-3">' +
            '<ol class="breadcrumb weg-color white-text" style="font-size: 16px;">' + 
                '<li class="breadcrumb-item mt-1">' +
                    '<a onclick="goHome()"><i class="fa fa-home white-text pointer"></i></a>' +
                '</li>' +
                '<li class="breadcrumb-item mt-1 text-warning">' +
                    '<span class="text-uppercase text-warning">Editar assunto</span>' +
                '</li>' + 
            '</ol>' + 
        '</nav>' 
    )
}
$(window).load(function(){
    $('#onetIDListForm').css({ 'width':'100%'});
    $('#contentRow').removeAttr('style');
    $($("#part1").children()[4]).hide()
    $("#part1 table").attr({ 'border':'0', 'width':'100%' })
    $($("#WebPartWPQ2").children()[0]).replaceWith($("#part1"))
})

function buildForm(){
    $("#containerConteudo").append(
        '<div class="text-danger">* são campos obrigatórios.</div>' +
        '<div class="card mt-3 collapse show">' +
            '<div class="card-body border border-radius p-3 border-primary">' +
                '<div class="row pl-3 pr-3">' + RowAndColumns(1, 6, [ 6,6,6,6,3 ]) + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="card mt-3 collapse show">' +
            '<div class="card-body border border-radius p-3 border-primary">' +
                '<div class="row pt-3 pl-3 pr-3">' + RowAndColumns(6, 15, [ 12,12,6,3,12,12,12,3,3 ]) + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="card mt-3 collapse show">' +
            '<div class="card-body border border-radius p-3 border-primary">' +
                '<div class="card-header text-left text-weg font-weight-bold" style="font-size:1.25rem;">Convocados</div>' +
                    '<div class="row pl-3 pr-3">' + RowAndColumns(15, 21, [ 6,6,6,6,6,6 ]) + '</div>' +
            '</div>' +
        '</div>' +
        '<div id="newFormAttach" class="mt-3"></div>'
    )
    adicionaInputs()
    Attach()
}
function RowAndColumns(inicio, fim, tam){
    var body = '',j =0
    for(i=inicio; i<fim; i++){
        var label = $($($($(TRs[i]).children()[0]).children()[0]).children()[0]).text()
        var desc  = $($($(TRs[i]).children()[1]).children()[1]).text()

        body += '<div class="col-' + tam[j] + ' pt-2">' +
                    '<label class="mb-0 text-weg font-weight-bold" style="text-align:left">' +
                        obrigatorio(label) + 
                    '</label>' +
                    '<div id="inputCol' + i + '"></div>' +
                    '<p><i>' + desc + '</i></p>' +
                '</div>'
        j++;
    }
    return body
}
function adicionaInputs(){
    var i=0;
    allInputs.forEach(function(span){
        var input = $(span)[0].parentNode
        $("#inputCol" + i).append(input)
        i++
    })
    allConvocados.forEach(function(span){
        var input = $(span)[0].parentNode
        $("#inputCol" + i).append(input)
        i++
    })
}
function obrigatorio(item){
    if(item.indexOf("*") != '-1'){
        var label = item.substring(0,item.indexOf('*'))
        return label + '<span class="text-danger ml-0">*</span>' 
    } else {
        return item
    }
}
function Attach(){
    AttachWhole = $("#partAttachment")
    AttachTR    = $(attachtable)[0]

    $($($($(AttachWhole).children()[0]).children()[0]).children()[0]).remove() 
    $($($($($($(AttachWhole).children()[0]).children()[0]).children()[0])).children()[0]).text('Anexar Arquivos') 
    $("#newFormAttach").html(
        '<div class="col p-3">' +
            '<div class="row"><div id="insertFiles" class="pl-3"></div></div>' + 
            '<div class="row"><div id="insertButton" class="pl-3"></div></div>' + 
            '<div class="row"><div id="insertTable" class="pl-3"></div></div>' +
        '</div>'
    )
    $("#insertFiles").append(AttachWhole) 
    $("#insertButton").append(toggleButton)
    $("#insertTable").append(AttachTR) 
}

function inputClasses(){
    allInputs.forEach(function(e){
        if(e.indexOf('DateTimeFieldTopTable') != '-1') { 
            realDate = e.substring(0,e.indexOf('DateTimeFieldTopTable')) + 'DateTimeFieldDate' 
            $(e).attr('width','100%').removeAttr('title').css({'width':'100%'});
            $(realDate).addClass('form-control').attr('width','100%').removeAttr('title').css({'width':'100%'});
        } else if (e.indexOf('DropDownChoice') != '-1'){
            $(e).addClass('form-control custom-select').attr('width','100%').removeAttr('title').css({'width':'100%','font-size':'12px'});
        } else if (e.indexOf('FillInTable') != '-1'){
            var text = e.substring(0, e.indexOf('FillInTable')) + '\\$FillInChoice'
            $(e + ' select').addClass('form-control custom-select').attr('width','90%').removeAttr('title').css({'width':'90%','font-size':'12px'});
            $(text).addClass('form-control').attr('width','90%').removeAttr('title').css({'width':'90%'});
        } else {
            $(e).addClass('form-control').attr('width','100%').removeAttr('title').css({'width':'100%','height':'auto'})//.addClass('invalidForm');
        }
    })
    allConvocados.forEach(function(e){
        $(e).addClass('form-control').attr('width','100%').removeAttr('title').css({'width':'100%','height':'auto'})
    })
    $(Retorno).maskMoney({prefix:'R$ ',thousands:'.',decimal:','});
    $(Investimento).maskMoney({prefix:'R$ ',thousands:'.',decimal:','});
    var fakeDepto = '<select id="fakeDepto">' +
                        '<option>Selecione um Departamento</option>' +
                        '<option value="Depto Assistência Técnica">Depto Assistência Técnica</option>' +
                    '</select>'
    var fakeSecao = '<select id="fakeSecao"><option>Selecione um Departamento</option></select>'

    $(fakeDepto).insertBefore(Departamento).addClass('form-control custom-select').attr('width','90%').removeAttr('title').css({'width':'90%','font-size':'12px'});
    
    var departamentoAtual = '';
	arrayMotores.forEach(function(e,i,u){
		if (e.Departamento != departamentoAtual){
			departamentoAtual = e.Departamento;
			$("#fakeDepto").append('<option value="' + u[i].Departamento + '">' + u[i].Departamento + '</option>')
		}
	});
    $(Departamento).hide()

    $(fakeSecao).insertBefore(Secao).addClass('form-control custom-select').attr('width','90%').removeAttr('title').css({'width':'90%','font-size':'12px'});
    $(Secao).hide()

    $("#fakeDepto").on('change', function(){ 
        $(Departamento).val($("#fakeDepto option:selected").val()) 
        DeptoValue = $('#fakeDepto').val();
        $("#fakeSecao").html('<option>Selecione uma Seção</option>')
        var secaoAtual = '';
        $("#fakeSecao").append('<option></option>')
            arrayMotores.forEach(function(e,i,u){
                if (e.Secao != secaoAtual && e.Departamento == DeptoValue){
                    secaoAtual = e.Departamento;
                    $("#fakeSecao").append('<option value="' + u[i].Secao + '">' + u[i].Secao + '</option>')
                }
            });
    })

    $("#fakeSecao").on('change', function(){
        $(Secao).val($("#fakeSecao option:selected").val()) 
    })

}
function buildButtons(){
    var buttonsTable = $(backButton)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    $("#containerConteudo").append( '<div id="divBotoes" class="mt-3 text-center"></div>' )
    $("#divBotoes").html(buttonsTable)
    $(backButton).addClass('btn btn-danger btn-form').val('Voltar')
    $(saveButton).addClass('btn btn-success btn-form')
}

function toggleAttach(){ $(AttachWhole).toggle(500) }

function goHome(){ window.location.href = "/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx" }

function forceChange(){
	DeptoValue = $(Departamento).val()
	if(DeptoValue!=''){ $("#fakeDepto").val(DeptoValue) }

	var secaoAtual = '';
	$("#fakeSecao").append('<option></option>')
	arrayMotores.forEach(function(e,i,u){
		if (e.Secao != secaoAtual && e.Departamento == DeptoValue){
			secaoAtual = e.Departamento;
			$("#fakeSecao").append('<option value="' + u[i].Secao + '">' + u[i].Secao + '</option>')
		}
	});

	if($(Secao).val()!=''){
		SecaoValue = $(Secao).val()
		$("#fakeSecao").val(SecaoValue)
	}
}