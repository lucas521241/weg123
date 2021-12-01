$(window).load(function(){
    ajustaForm();
});

function ajustaForm(){
    var fieldferramentas = $('#ferramentasUtilizadas');
    var ferramentas = $(fieldferramentas)[0].innerText;
    if (ferramentas.search('SIX SIGMA') >= 0 ){
        $('#endSixSigma').removeClass('d-none');
    }
    $('input[id$="gobackbutton2_ctl00_diidIOGoBack"]').addClass('btn').addClass('btn-danger').addClass('btn-form').css('width','130px').css('height','40px');
}