$(document).ready(function(){
    allExibs.forEach(function(e){ TRs.push($(e)[0].parentNode.parentNode.parentNode) })
    $($('#part1').children()[2]).html('<div id="containerConteudo" class="container"></div>');
    buildBreadCrumb()
    buildForm()
    $($("#part1").children()[3]).empty()
    buildButtons()
    $(backButton).removeAttr('onclick').click(function(){ window.location.href = postbackCancel })
}); 

function buildBreadCrumb(){
    $("#containerConteudo").append(
        '<nav aria-label="breadcrumb white-text" class="mb-3">' +
            '<ol class="breadcrumb weg-color white-text" style="font-size: 16px;">' + 
                '<li class="breadcrumb-item mt-1">' +
                    '<a onclick="goHome()"><i class="fa fa-home white-text pointer"></i></a>' +
                '</li>' +
                '<li class="breadcrumb-item mt-1 text-warning">' +
                    '<span class="text-uppercase text-warning">Exibir assunto</span>' +
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
    Attach()
}
function RowAndColumns(inicio, fim, tam){
    var body = '',j =0
    for(i=inicio; i<fim; i++){
        var label = $($($(TRs[i]).children()[0]).children()[0]).text()
        var input  = $($(TRs[i]).children()[1]).text()
        body += '<div class="col-' + tam[j] + ' pt-2">' +
                    '<label class="mb-0 text-weg font-weight-bold" style="text-align:left">' + label + '</label>' +
                    '<div id="inputCol' + i + '">' + input + '</div>' +
                '</div>'
        j++;
    }
    return body
}
function Attach(){
    AttachTR    = $(attachtable)[0]
    $("#newFormAttach").html(
        '<div class="col p-3">' +
            '<div class="row"><div id="insertTable" class="pl-3"></div></div>' +
        '</div>'
    )
    $("#insertTable").append(AttachTR) 
}

function buildButtons(){
    var buttonsTable = $(backButton)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    $("#containerConteudo").append( '<div id="divBotoes" class="mt-3 text-center"></div>' )
    $("#divBotoes").html(buttonsTable)
    $(backButton).addClass('btn btn-danger btn-form').val('Voltar')
}

function goHome(){ window.location.href = "/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx" }