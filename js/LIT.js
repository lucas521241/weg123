var arrayTermos = [];
var arrayEmpresas = [];
var arrayAreas = [];

$(window).load(function(){
    getEmpresas();
    getAreas();
    ajustaForm();
    endSixSigma();
    checkResultado();
    $('[data-toggle="tooltip"]').tooltip();
    // $("input[id$='savebutton2_ctl00_diidIOSaveItem']").removeAttr('onclick').click(function(){
    //     if (!PreSaveItem()) return false; 
    //     //if (SPClientForms.ClientFormManager.SubmitClientForm('WPQ2')) return false; 
    //     WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl32$g_3e8fc72a_dba6_4550_8736_117d9c10cc98$savebutton2$ctl00$diidIOSaveItem", "", true, "", "", false, true))
    // })
});

function getEmpresas(){
	arrayEmpresas = [];
	arrayEmpresas = GetListItems('45536FE5-1637-40AA-96B2-04F09CC8A52B', '?$orderby=Codigo&$top=999999', 'https://intranet.weg.net/br/');
}

function getAreas(){
	arrayAreas = [];
	arrayAreas = GetListItems('71C0F7B3-0A22-4566-9A1D-C8292C8C9A7B', '?$top=999999', 'https://intranet.weg.net/br/');
	arrayAreas = SortArray(arrayAreas, 'Secao');
	arrayAreas = SortArray(arrayAreas, 'Departamento');
	arrayAreas = SortArray(arrayAreas, 'Unidade');
}

function showUnidade(fieldID){
	var unidadeAtual = '';
	arrayAreas.forEach(function(e){
		if (e.Unidade != unidadeAtual){
			unidadeAtual = e.Unidade;
			AddDropDownItem('optUnidade' + fieldID, unidadeAtual);
		}
	});
}

function changeUnidade(fieldID, inputID, optUnidade){
	$('input[id$="ff' + inputID + '1_ctl00_ctl00_TextField"]').val(optUnidade);
	var nextInput = Number(inputID) + 1;
	$('input[id$="ff' + nextInput + '1_ctl00_ctl00_TextField"]').val('');
	$('#optDepartamento' + fieldID).empty();
	nextInput ++;
	$('input[id$="ff' + nextInput + '1_ctl00_ctl00_TextField"]').val('');
	$('#optSecao' + fieldID).empty();
	showDepartamento(fieldID);
}

function showDepartamento(fieldID){
	var optUnidade = $('#optUnidade' + fieldID).val();
	var departamentoAtual = '';
	AddDropDownItem('optDepartamento' + fieldID, '');
	arrayAreas.forEach(function(e){
		if (e.Unidade == optUnidade && e.Departamento != departamentoAtual){
			departamentoAtual = e.Departamento;
			AddDropDownItem('optDepartamento' + fieldID, departamentoAtual);
		}
	});
}

function changeDepartamento(fieldID, inputID, optDepartamento){
	$('input[id$="ff' + inputID + '1_ctl00_ctl00_TextField"]').val(optDepartamento);
	var nextInput = Number(inputID) + 1;
	$('input[id$="ff' + nextInput + '1_ctl00_ctl00_TextField"]').val('');
	$('#optSecao' + fieldID).empty();
	showSecao(fieldID);
}

function showSecao(fieldID){
	var optUnidade = $('#optUnidade' + fieldID).val();
	var optDepartamento = $('#optDepartamento' + fieldID).val();
	var secaoAtual = '';
	AddDropDownItem('optSecao' + fieldID, '');
	arrayAreas.forEach(function(e){
		if (e.Unidade == optUnidade && e.Departamento == optDepartamento && e.Secao != secaoAtual){
			secaoAtual = e.Secao;
			AddDropDownItem('optSecao' + fieldID, secaoAtual);
		}
	});
}

function changeSecao(inputID, optSecao){
	$('input[id$="ff' + inputID + '1_ctl00_ctl00_TextField"]').val(optSecao);
}

function showEmpresas(fieldID){
	arrayEmpresas.forEach(function(e){
		var label = e.Codigo + ' - ' + e.Title;
		AddDropDownItem('optColabEmpresa' + fieldID, e.Codigo, label);
	});
}

function ajustaForm(){
    showUnidade('Impactada');
    var unidadeImpactada = $('input[id$="ff20001_ctl00_ctl00_TextField"]').val();
    var departamentoImpactada = $('input[id$="ff20011_ctl00_ctl00_TextField"]').val();
    var secaoImpactada = $('input[id$="ff20021_ctl00_ctl00_TextField"]').val();

    if (unidadeImpactada != ''){
        $('#optUnidadeImpactada').val(unidadeImpactada);
        changeUnidade('Impactada', '2000', unidadeImpactada)
    }
    if (departamentoImpactada != ''){
        $('#optDepartamentoImpactada').val(departamentoImpactada);
        changeDepartamento('Impactada', '2001', departamentoImpactada)
    }
    if (secaoImpactada != ''){
        $('#optSecaoImpactada').val(secaoImpactada);
        changeSecao('2002', secaoImpactada);
    }
    
    $('select[id$="ff11_ctl00_DropDownChoice"]').addClass('form-control').attr('width','100%');
    $('select[id$="ff21_ctl00_DropDownChoice"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff31_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');
    $('select[id$="ff51_ctl00_DropDownChoice"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff61_ctl00_ctl04"]').on("change", function(){
        endSixSigma();
    });

    $('select[id$="ff471_ctl00_DropDownChoice"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff481_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff801_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff811_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff821_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');
    $('input[id$="ff831_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%');

    //Responsável
    $('input[id$="ff71_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Coordenador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('7','1');
        }else{
            clearColab('7', '7', '1');
        }
    });
    $('input[id$="ff81_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff91_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff101_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff111_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('7','1');
        }else{
            clearColab('11', '7', '1');
        }
    });
    showEmpresas('1');
    var colab1Empresa = $('input[id$="ff91_ctl00_ctl00_TextField"]').val();
    if (colab1Empresa != ''){
        $('#optColabEmpresa1').val(colab1Empresa);
    }

    //Orientador
    $('input[id$="ff121_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('12','2');
        }else{
            clearColab('12', '12', '2');
        }
    });
    $('input[id$="ff131_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff141_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff151_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff161_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('12','2');
        }else{
            clearColab('16', '12', '2');
        }
    });
    showEmpresas('2');
    var colab2Empresa = $('input[id$="ff141_ctl00_ctl00_TextField"]').val();
    if (colab2Empresa != ''){
        $('#optColabEmpresa2').val(colab2Empresa);
    }

    //Colaborador 3
    $('input[id$="ff171_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('17','3');
        }else{
            clearColab('17', '17', '3');
        }
    });
    $('input[id$="ff181_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff191_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff201_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff211_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('17','3');
        }else{
            clearColab('21', '17', '3');
        }
    });
    showEmpresas('3');
    var colab3Empresa = $('input[id$="ff191_ctl00_ctl00_TextField"]').val();
    if (colab3Empresa != ''){
        $('#optColabEmpresa3').val(colab3Empresa);
    }

    //Colaborador 4
    $('input[id$="ff221_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('22','4');
        }else{
            clearColab('22', '22', '4');
        }
    });
    $('input[id$="ff231_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff241_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff251_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff261_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('22','4');
        }else{
            clearColab('26', '22', '4');
        }
    });
    showEmpresas('4');
    var colab4Empresa = $('input[id$="ff241_ctl00_ctl00_TextField"]').val();
    if (colab4Empresa != ''){
        $('#optColabEmpresa4').val(colab4Empresa);
    }

    //Colaborador 5
    $('input[id$="ff271_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('27','5');
        }else{
            clearColab('27', '27', '5');
        }
    });
    $('input[id$="ff281_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff291_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff301_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff311_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('27','5');
        }else{
            clearColab('31', '27', '5');
        }
    });
    showEmpresas('5');
    var colab5Empresa = $('input[id$="ff291_ctl00_ctl00_TextField"]').val();
    if (colab5Empresa != ''){
        $('#optColabEmpresa5').val(colab5Empresa);
    }

    //Colaborador 6
    $('input[id$="ff321_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('32','6');
        }else{
            clearColab('32', '32', '6');
        }
    });
    $('input[id$="ff331_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff341_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff351_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff361_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('32','6');
        }else{
            clearColab('36', '32', '6');
        }
    });
    showEmpresas('6');
    var colab6Empresa = $('input[id$="ff341_ctl00_ctl00_TextField"]').val();
    if (colab6Empresa != ''){
        $('#optColabEmpresa6').val(colab6Empresa);
    }

    //Colaborador 7
    $('input[id$="ff371_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('37','7');
        }else{
            clearColab('37', '37', '7');
        }
    });
    $('input[id$="ff381_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff391_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff401_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff411_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('37','7');
        }else{
            clearColab('41', '37', '7');
        }
    });
    showEmpresas('7');
    var colab7Empresa = $('input[id$="ff391_ctl00_ctl00_TextField"]').val();
    if (colab7Empresa != ''){
        $('#optColabEmpresa7').val(colab7Empresa);
    }

    //Colaborador 8
    $('input[id$="ff421_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Nome do Colaborador').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3, 
        select: function (event, ui){
            autorItemID = ui.item.desc;
        }
    }).bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            siteUserByName('42','8');
        }else{
            clearColab('42', '42', '8');
        }
    });
    $('input[id$="ff431_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff441_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff451_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff461_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').attr('placeholder','Cadastro').bind("keypress keyup keydown", function(e){
        if(e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            getUserByCadastro('42','8');
        }else{
            clearColab('46', '42', '8');
        }
    });
    showEmpresas('8');
    var colab8Empresa = $('input[id$="ff441_ctl00_ctl00_TextField"]').val();
    if (colab8Empresa != ''){
        $('#optColabEmpresa8').val(colab8Empresa);
    }

    $('input[id$="ff491_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').addClass('text-right').maskMoney({
        thousands:'.', 
        decimal:',',
    });

    $('input[id$="ff501_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').addClass('text-right').maskMoney({
        thousands:'.', 
        decimal:',',
    });

    $('input[id$="ff511_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').addClass('text-right').maskMoney({
        thousands:'.', 
        decimal:',',
    });

    $('select[id$="ff531_ctl00_DropDownChoice"]').addClass('form-control').attr('width','100%');
    $('div[id$="ff541_ctl00_ctl00_TextField_inplacerte"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('select[id$="ff561_ctl00_DropDownChoice"]').addClass('custom-select').attr('width','100%').removeAttr('title');
    $('input[id$="ff571_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title');
    $('input[id$="ff581_ctl00_ctl00_TextField"]').addClass('form-control').attr('width','100%').removeAttr('title').autocomplete({ 
        source: AutocompleteUserSource, 
        minLength: 3
    });
    
    $('input[id$="ff551_ctl00_ctl00').on("click", function(){
    	$('input[id$="ff561_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff571_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff581_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').addClass('d-none');
	    $('#divComissao2').addClass('d-none');
	    $('#divGestor').addClass('d-none');
    });
    
    $('input[id$="ff551_ctl00_ctl01').on("click", function(){
    	$('input[id$="ff581_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').removeClass('d-none');
	    $('#divComissao2').removeClass('d-none');
	    $('#divGestor').addClass('d-none');
    });
    
    $('input[id$="ff551_ctl00_ctl02').on("click", function(){
    	$('input[id$="ff561_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff571_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').addClass('d-none');
	    $('#divComissao2').addClass('d-none');
	    $('#divGestor').removeClass('d-none');
    });

    $('#AttachmentButton').addClass('btn').addClass('btn-outline-default').addClass('waves-effect').addClass('btn-form');
    $('input[id$="savebutton2_ctl00_diidIOSaveItem"]').addClass('btn').addClass('btn-success').addClass('btn-form').css('width','130px').css('height','40px');
    $('input[id$="gobackbutton2_ctl00_diidIOGoBack"]').addClass('btn').addClass('btn-danger').addClass('btn-form').css('width','130px').css('height','40px');

}

function checkResultado(){
	if ($('input[id$="ff551_ctl00_ctl00')[0].checked == true){
		$('input[id$="ff561_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff571_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff581_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').addClass('d-none');
	    $('#divComissao2').addClass('d-none');
	    $('#divGestor').addClass('d-none');
	}else if ($('input[id$="ff551_ctl00_ctl01')[0].checked == true){
		$('input[id$="ff581_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').removeClass('d-none');
	    $('#divComissao2').removeClass('d-none');
	    $('#divGestor').addClass('d-none');
	}else if ($('input[id$="ff551_ctl00_ctl02')[0].checked == true){
		$('input[id$="ff561_ctl00_ctl00_TextField"]').val('');
	    $('input[id$="ff571_ctl00_ctl00_TextField"]').val('');
	    $('#divComissao1').addClass('d-none');
	    $('#divComissao2').addClass('d-none');
	    $('#divGestor').removeClass('d-none');
	}
}

function endSixSigma(){
    var inputSixSigma = $('input[id$="ff61_ctl00_ctl04"]');
    if ($(inputSixSigma)[0].checked == true){
        $('#endSixSigma').removeClass('d-none');
    }else{
        $('#endSixSigma').addClass('d-none');
    }
}

function clearColab(origem, fieldName, colabNum){
	autorItemID = '';
	if (origem != fieldName){
		$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//NOME
    }
    var fieldPrimeiro = fieldName;
	fieldName = Number(fieldName) + 1;
	$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//E-MAIL
	fieldName = Number(fieldName) + 1;
	$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//EMPRESA
    fieldName = Number(fieldName) + 1;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//UNIDADE
	fieldName = Number(fieldName) + 1;
	if (origem != fieldName){
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//CADASTRO
	}
	if (origem != 'select' && origem != fieldName){
		$('#optColabEmpresa' + colabNum).val('');
    }

    fieldName = Number(fieldName) * 10;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//CÓDIGO PESSOA
    if (fieldPrimeiro == 7){
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//DEPARTAMENTO
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//SECAO
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//TURNO
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//CHEFE
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val('');//CHEFE MAIL
    }
}

function AutocompleteUserSource(request, response) {
    infoColab = [];
    document.getElementById('functionFrame').contentWindow.getColabByName(request.term,response);
}

function returnColaboradores(arrayDados,response){
    if (arrayDados.length > 0) {
		infoColab = $.grep(arrayDados,function(e){
			return (
				e[7] != '8' 	&&	//Licença sem Remuneração
				e[7] != '67' 	&&	//Licença Remun.Dir.Sindical
				e[7] != '86' 	&&	//Licença S/Remun.Dir.Sindical
				e[7] != '107' 	&&	//Licença S/Remuneração EXTERIOR
				e[7] != '115' 	&&	//Licença S/Remuneração BRASIL
				e[7] != '137' 	&&	//Licença S/Remun.Dir.Estat.
				e[25] != '1.1.110.0180.01.09' 			&&	//Projeto WMO India
				e[25] != '1.1.100.0180.01.01.002.01'	&&	//Setor Expatriados Auditoria"
				e[25] != '1.1.110.0180.01.05.011.01'	&&	//Setor Expatriados Motores"
				e[25] != '1.1.120.0180.01.12.016.01'	&&	//Setor Expatriados Energia"
				e[25] != '1.1.130.0155.01.08.004.01'	&&	//Setor Expatriados Drives e Controls"
				e[25] != '1.1.150.0180.01.01.015.06'	&&	//Setor Expatriados Transmissao e Distribuicao"
				e[25] != '1.1.160.0195.01.01.001.04'	&&	//Setor Expatriados Tintas"
				e[25] != '1.1.180.0180.01.01.028.02'	&&	//Setor Expatriados Americas Africa Oceania e Asia Pacifico"
				e[25] != '1.1.180.0180.01.01.028.03'		//Setor Expatriados Europa MENA e CIS"
			)
		});

        response($.map(infoColab, function (item) {
            return {
				value: 	item[1],	//ID
				label: 	item[1] + ' (' + item[3] + ')',	//Nome
				desc: 	item[0],
				email:	item[6]
			}
        }));
    }
}

function getUserByCadastro(fieldName, colabNum){
	$('#optColabEmpresa' + colabNum).removeClass('invalidForm');
	$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').removeClass('invalidForm');
	$('#buscaCadBlank' + colabNum).hide();

	var autorEmpresa = $('#optColabEmpresa' + colabNum).val();
	var fieldCadastro = Number(fieldName) + 4;
	var autorCadastro = $('input[id$="ff' + fieldCadastro + '1_ctl00_ctl00_TextField"]').val();

	if(autorEmpresa == '' || autorCadastro == ''){
		$('#optColabEmpresa' + colabNum).addClass('invalidForm');
		$('input[id$="ff' + fieldCadastro + '1_ctl00_ctl00_TextField"]').addClass('invalidForm');
		$('#buscaCadBlank' + colabNum).show();
	}else{
		document.getElementById('functionFrame').contentWindow.getEquipByCadastro(autorEmpresa, autorCadastro, fieldName, colabNum);
	}
}

function siteUserByName(fieldName, colabNum){
	$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').removeClass('invalidForm');
	$('#buscaNomeInvalid' + colabNum).hide();

	if (autorItemID == ''){
		$('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').addClass('invalidForm');
		$('#buscaNomeInvalid' + colabNum).show();
	}else{
		var userSelect = $.grep(infoColab, function(e){return e[0] == autorItemID});
		setCamposAutor(userSelect, fieldName, colabNum);
	}
}

function siteUserByCadastro(userSelect, fieldName, colabNum){
	$('#optColabEmpresa' + colabNum).removeClass('invalidForm');
	var fieldCadastro = Number(fieldName) + 3;
	$('input[id$="ff' + fieldCadastro + '1_ctl00_ctl00_TextField"]').removeClass('invalidForm');
	$('#buscaCadInvalid' + colabNum).hide();

	if (userSelect.length < 1){
		$('#optColabEmpresa' + colabNum).addClass('invalidForm');
		$('input[id$="ff' + fieldCadastro + '1_ctl00_ctl00_TextField"]').addClass('invalidForm');
		$('#buscaCadInvalid' + colabNum).show();
	}else{
		setCamposAutor(userSelect, fieldName, colabNum);
	}
}

function setCamposAutor(userSelect, fieldName, colabNum){
    var fieldPrimeiro = fieldName;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][1]).removeClass('invalidForm');//NOME
    fieldName = Number(fieldName) + 1;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][6]).removeClass('invalidForm');//E-MAIL
    fieldName = Number(fieldName) + 1;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][19]).removeClass('invalidForm');//EMPRESA
    fieldName = Number(fieldName) + 1;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][20]).removeClass('invalidForm');//UNIDADE
    fieldName = Number(fieldName) + 1;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][3]).removeClass('invalidForm');//CADASTRO
    fieldName = Number(fieldName) * 10;
    $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][2]).removeClass('invalidForm');//CÓDIGO PESSOA

    if (fieldPrimeiro == 7){
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][22]).removeClass('invalidForm');//DEPARTAMENTO
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][23]).removeClass('invalidForm');//SECAO
        var membroTurno = userSelect[0][13];
        if (membroTurno == 'Geral')
            membroTurno = 'Turno Normal';
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(membroTurno).removeClass('invalidForm');//TURNO
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][38]).removeClass('invalidForm');//CHEFE
        fieldName = Number(fieldName) + 1;
        $('input[id$="ff' + fieldName + '1_ctl00_ctl00_TextField"]').val(userSelect[0][40]).removeClass('invalidForm');//CHEFE MAIL
    }

	$('#optColabEmpresa' + colabNum).val(userSelect[0][19]).removeClass('invalidForm');
	$('#buscaNomeInvalid' + colabNum).hide();
	$('#buscaCadBlank' + colabNum).hide();
	$('#buscaCadInvalid' + colabNum).hide();
}

function PreSaveAction(){
    $('#alert1').html();
    $('#alert2').html();
    $('.invalid-form').removeClass('invalid-form');

    var unidade = $('input[id$="ff20001_ctl00_ctl00_TextField"]').val();
    if (unidade == ''){
        $('#optUnidadeImpactada').addClass('invalid-form');
    }

    var departamento = $('input[id$="ff20011_ctl00_ctl00_TextField"]').val();
    if (departamento == ''){
        $('#optDepartamentoImpactada').addClass('invalid-form');
    }
    
    var secao = $('input[id$="ff20021_ctl00_ctl00_TextField"]').val();
    if (secao == ''){
        $('#optSecaoImpactada').addClass('invalid-form');
    }   

    var problema = $('input[id$="ff31_ctl00_ctl00_TextField"]').val();
    if (problema == ''){
        $('input[id$="ff31_ctl00_ctl00_TextField"]').addClass('invalid-form');
    }

    var prazo = $('input[id$="ff41_ctl00_ctl00_DateTimeField_DateTimeFieldDate"]').val();
    if (prazo == ''){
        $('input[id$="ff41_ctl00_ctl00_DateTimeField_DateTimeFieldDate"]').addClass('invalid-form');
    }

    var coordenador = $('input[id$="ff81_ctl00_ctl00_TextField"]').val();
    if (coordenador == ''){
        $('input[id$="ff71_ctl00_ctl00_TextField"]').addClass('invalid-form');
    }

    
    if (unidade != '' && departamento != '' && secao != '' && problema != '' && prazo != '' && coordenador != ''){
        var inputSixSigma = $('input[id$="ff61_ctl00_ctl04"]');
        var endSixSigma = $('input[id$="ff481_ctl00_ctl00_TextField"]').val()
        if ($(inputSixSigma)[0].checked == true && endSixSigma == ''){
            $('input[id$="ff481_ctl00_ctl00_TextField"]').addClass('invalid-form');
            alertObrigatorio();
            return false;
        }else{
            return true;
        }
    }else{
        alertObrigatorio();
        return false;
    }
}

function alertObrigatorio(){
    $('#alert1').html(
        '<div class="alert alert-danger" role="alert">' +
            'Há campos obrigatórios não preenchidos. Favor inserir todas as informações.' +
        '</div>'
    );
    $('#alert2').html(
        '<div class="alert alert-danger" role="alert">' +
            'Há campos obrigatórios não preenchidos. Favor inserir todas as informações.' +
        '</div>'
    );
}