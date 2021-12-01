var listProjetos = '1647EBF9-4F66-455F-A5D4-E5BA810A3844';
var arrayProjetos = [];

$(document).ready(function(){
    GetCurrentSiteUrl();
    criaCabecalho();
    getProjetos();
    showProjetos();
});

function criaCabecalho(){
    $('#contentPage').append(
        '<div class="row weg-color m-0" style="height:100px">' +
            '<div class="col pt-4"><h1 class="text-white font-weight" id="label-Title">Assuntos para CDQ</h1></div>' +
            '<div class="col-3 pt-5"></div>' +
        '</div>' + 
        '<div id="divProjetos" class="mt-3">'
    )
}

function getProjetos(){ 
    arrayProjetos = [];
    arrayProjetos = GetListItems(listProjetos, '?$top=999999', 'https://intranet.weg.net/br/motores/controle-qualidade/');
    console.log(arrayProjetos) 
}

function showProjetos(){
    $('#divProjetos').html(
        '<table id="dataTable" class="table table-striped mt-2" cellspacing="0" width="100%">' +
            '<thead>' +
                '<tr>' +
                    '<th class="text-center p-1" style="width:3% !important"></th>' +
                    '<th class="text-center p-1" style="width:7% !important"></th>' +
                    '<th class="text-center p-1" style="width:30% !important"></th>' +
                    '<th class="text-center p-1" style="width:20% !important"></th>' +
                    '<th class="text-center p-1" style="width:20% !important"></th>' +
                    '<th class="text-center p-1" style="width:20% !important"></th>' +
                '</tr>' +
                '<tr>' +
                    '<th class="text-center p-1" style="width:3% !important"><i class="fa fa-paperclip"></i></th>' +
                    '<th class="text-center p-1" style="width:7% !important" id="label-headProjetosID">ID</th>' +
                    '<th class="text-center p-1" style="width:30% !important" id="label-headProjetosTitulos">Assunto</th>' +
                    '<th class="text-center p-1" style="width:20% !important" id="label-headProjetosDepartamento">Departamento</th>' +
                    '<th class="text-center p-1" style="width:20% !important" id="label-headProjetosSecao">Seção</th>' +
                    '<th class="text-center p-1" style="width:20% !important" id="label-headProjetosSolicitante">Solicitante</th>' +
                '</tr>' +
            '</thead>' +
        '</table>'
    );

    var fieldTitulo = 'Assunto';
    var labelProjetos = 'Projetos';
    var fieldMostrar = 'Mostrar';

    $('#dataTable').DataTable({
        destroy: true,
        data: arrayProjetos,
        columns: [
            { 
                'data': 'Attachments', 
                'render': function (data, type, row) {
                    if (data == true){
                        data = '<i class="fa fa-paperclip"></i><div class="d-none">Sim</div>';
                    }else{
                        data = '<div class="d-none">Não/div>';
                    }
                    return data;
                }
            },
            {'data': 'ID'},
            {
                'data': fieldTitulo,
                'render': function (data, type, row) {
                    data = '<a class="text-primary text-justify" href="' + SiteUrl + 'Lists/COMISSO%20DA%20QUALIDADE%202/DispForm.aspx?ID=' + row.ID + '">' + data + '</a>';
                    return data;
                }
            },
            {'data': 'Departamento'},
            {'data': 'Se_x00e7__x00e3_o'},
            {
                'data': 'SolicitanteId', 
                'render' : function(data,type,row) {
                    data = GetUserInformation(data.results[0],'https://intranet.weg.net/br/motores/controle-qualidade/').Title
                    return data
                }
            }
        ],
        columnDefs: [
            {
                targets: [2],
                createdCell: function (td) {
                    $(td).css('color', '#00579d')
                }
            },
            { type: 'natural', targets: [1] }
        ],
        displayLength: 25,
        lengthChange: true,
        fixedHeader: true,
        responsive: true,            
        order: [[1, 'desc']],
        language: {
            lengthMenu: fieldMostrar + " _MENU_ " + labelProjetos,
            info: "_START_ a _END_ de _TOTAL_ " + labelProjetos,
            infoFiltered: "",
            paginate: {
                first: "Primeira",
                previous: "Anterior",
                next: "Pr&oacute;xima",
                last: "&Uacute;ltima"
            },
            aria: {
                sortAscending: ": Ordenar Crescente",
                sortDescending: ": Ordenar Decrescente"
            },
        },
        searchDelay: 0,
        ordering: true,
        initComplete: function () {
            this.api().columns().every( function (i) {
                if (i != 2 && i != 0 && i != 5){
                    var column = this;
                    var select =  $('<select id="filter_' + i + '" class="custom-select"><option value=""></option></select>')
                        .appendTo($('#dataTable thead tr:eq(0) th:eq(' + i + ')').empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        });

                        column.data().unique().sort().each(function(d, j) {
                            if (d != null){
                                select.append('<option value="' + d + '">' + d + '</option>');
                            }
                        });
                        var selectFilter = $('#filter_' + i);
                        sortSelect(selectFilter[0],'t');
                }else if (i == 0){
                    var column = this;
                    var select =  $('<select id="filter_' + i + '" class="custom-select"><option value=""></option></select>')
                        .appendTo($('#dataTable thead tr:eq(0) th:eq(' + i + ')').empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        if (d != null){
                            if (d == true){
                                select.append('<option value="Sim">Sim</option>');
                            }else{
                                select.append('<option value="Não">Não</option>');
                            }
                        }
                    });
                }else{
                    var column = this;
                    var select =  $('<input type="text" class="form-control" id="filter_' + i + '"/>')
                        .appendTo($('#dataTable thead tr:eq(0) th:eq(' + i + ')').empty())
                        .on('keyup change clear', function () {
                            var val = $(this).val();
                            column
                                .search(val)
                                .draw();
                        });
                }
                $('#dataTable thead tr:eq(1) th:eq(' + i + ')').css('borderBottom','0px')
            });
            $('#dataTable thead tr').clone(true).appendTo('#dataTable thead');
            $('#dataTable thead tr:eq(0)').addClass('d-none');
            $('#dataTable thead tr:eq(3)').addClass('d-none');
            $('#dataTable_filter').html('<button type="button" class="btn btn-outline-primary waves-effect" onclick="addProjeto()">Novo Assunto</button>');
        },
    });
}

function addProjeto(){
    window.location.href = SiteUrl + 'Lists/COMISSO%20DA%20QUALIDADE%202/NewForm.aspx?Source=https://intranet.weg.net/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx';
}