$(document).ready(function(){
    createBorder()
    createPage()
    createTitle()
    createRow2()
    createFlagsCard()
    $("#contentRow").css('margin',"")
})

function createBorder(){
    $("#content").html(
        '<div class="container" id="contains"></div>'
    )
}

function createPage(){
    $("#contains").html(
        '<div class="row" id="row1">'+
            '<div class="col" id="indexSystem"></div>' +
        '</div>' +
        '<div class="row" id="row2">' +
            '<div class="col-6" id="btnRejectionIndex"></div>' +
            '<div class="col-6" id="description"></div>' +
        '</div>' +
        '<div class="row" id="flagsCardRow">' +
            '<div class="col card" id="cardFlags"></div>' +
        '</div>'
    )
}

function createTitle(){
    $("#indexSystem").html(
        '<h2 class="text-center" id="titlePage2">QUALITY INDEX SYSTEM - QIS</h2>'
    )
}

function createRow2(){
    $("#btnRejectionIndex").html(
        '<a class="btn" href="https://qis.weg.net/softexpert?page=dashboard,9a7c9c3b309d4d2e8268c9bc238fd66e&hideworkspace=true" id="btnPlanning">' + 
            '<i id="btnIcon"><img src="/br/motores/controle-qualidade/SiteAssets/icons/icon-Globe-White.png"></img></i>' +
            '<span id="btnLabel" class="text-left">WMO GLOBAL FIELD <br> REJECTION INDEX</span><br><br><br>' +     
        '</a>' +
        '<div class="text-center" style="color:black;font-size:10pt;">Click here to open the index</div>'
    )

    $("#description").html(
        '<h5 class="text-left" id="descriptionText">Field Rejection Index of the manufacturing <br>sites of the Motors Unit worldwide</h5>'
    )
}

function createFlagsCard(){
    $("#cardFlags").html(
        '<div class="card-body">' +
            '<h4 class="label text-center border rounded" style="color:#ffffff; background-color: #0075B1;">QUALITY INDEX SYSTEM SITES</h4>' +
            '<div id="flagContainer" class="row w-100">' +
                createFlags('Brazil', "brazil",     "/br/motores/controle-qualidade/planejamento-da-qualidade/SitePages/Quality%20Index%20Sistem%20-%20QIS.aspx") +
                createFlags('China', "china",       "https://weg365.sharepoint.com/sites/cn/quality/SitePages/QIS.aspx") +
                createFlags('Mexico', "mexico",     "https://intranet.weg.net/mx/calidad/QIS/SitePages/Nuevo%20QIS.aspx") + 
                createFlags('Portugal', "portugal", "https://intranet.weg.net/pt/QIS/SitePages/QISHome.aspx#") +
                createFlags('USA<br>(not started)', "usa",           "#") +
                createFlags('Germany<br>(not started)', "germany",   "#") +
                createFlags('Argentina<br>(not started)', "argentina", "#") +
                createFlags('India<br>(not started)', "india", "#") +
		createFlags('South Africa<br>(not started)', "safrica", "#") +
            '</div>' +
        '<div>' +
        '<div id="end" class="text-center">Click on the country flag to access the local indicators portal</div>'
    )
}

function createFlags(title,flag,href){
    var appendThis =    '<div class="col">' +
                            '<a href="' + href + '">' +
                                '<img class="flag2" src="/br/motores/controle-qualidade/SiteAssets/flags/icon-' + flag + '-64.png"><br>' +
                                '<p class="text-center">' + title + '</p>' +
                            '</a>' +
                        '</div>'
    return appendThis
}




$("#contentRow").removeAttr('style')
$("s4-workspace").removeAttr('style')