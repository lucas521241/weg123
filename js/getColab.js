function getColabByName(stringColab,response){
    $.ajax({
        type: "POST",
        url: "GetInfoColab.aspx/ReturnColabByName",
        // url: "GetInfoColab.aspx/ReturnColab",
        data: JSON.stringify({
            "Nome": stringColab
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "false",
        success: function (data) {
            window.parent.returnColaboradores(data.d,response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getColabByCadastro(stringEmpresa, stringCadastro){
    $.ajax({
        type: "POST",
        url: "GetInfoColab.aspx/ReturnColabByCadastro",
        data: JSON.stringify({
            "Empresa": stringEmpresa,
            "Cadastro": stringCadastro
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "false",
        success: function (data) {
            window.parent.siteUserByCadastro(data.d);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getEquipByCadastro(stringEmpresa, stringCadastro, fieldName, colabNum){
    $.ajax({
        type: "POST",
        url: "GetInfoColab.aspx/ReturnColabByCadastro",
        data: JSON.stringify({
            "Empresa": stringEmpresa,
            "Cadastro": stringCadastro
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "false",
        success: function (data) {
            window.parent.siteUserByCadastro(data.d, fieldName, colabNum);
        },
        error: function (error) {
            console.log(error);
        }
    });
}