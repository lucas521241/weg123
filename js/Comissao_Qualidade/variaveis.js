var Titulo              = "#Title_fa564e0f-0c70-4ab9-b863-0177e6ddd247_\\$TextField"
var Solicitante         = "#Solicitante_bbf02bb3-fb8f-4dd4-981c-92af4780a950_\\$ClientPeoplePicker"
var Gerente             = "#Gerente_2c94e4d8-9307-466e-848d-9e9a25b1aa5b_\\$ClientPeoplePicker"
var Assunto             = "#Assunto_40dff189-d013-4a73-bb7b-d360603c3bbf_\\$TextField"
var Proposta            = "#Proposta_c4b64a62-5994-456b-b6d0-5e7742c61f3b_\\$TextField_topDiv"
var Justificativa       = "#Justificativa_da17d4ff-bd62-48c7-9cb3-fbcf2e26b2e8_\\$TextField_topDiv"
var Comentarios         = "#Coment_x00e1_rios_41b6b366-6f41-4b67-b549-a4f230380cba_\\$TextField_topDiv"
var Abrangencia         = "#Abrang_x00ea_ncia_d57dbe1d-4f58-4c5d-9622-44be42209463_\\$TextField_topDiv"
var Investimento        = "#Investimento_a78f5f77-a5ea-4db0-8539-11c2cfcd9bc9_\\$CurrencyField"
var Departamento        = "#Departamento_144374bf-4a1c-4209-9b93-0f72c693e125_\\$TextField"
var Secao               = "#Se_x00e7__x00e3_o_64476c92-9055-423c-829b-a22a8b397f03_\\$TextField"
var Tempo               = "#Tempo_x0020_necess_x00e1_rio_x00_32e39940-0ae9-48e9-b3b8-463cd32c800c_\\$DropDownChoice"
var Retorno             = "#Retorno_8f38b62f-1928-4bf0-84f3-5b394921744d_\\$TextField"
var Prazo               = "#Prazo_87cd5be9-d03a-4250-bfa0-78ffb27a7c59_\\$DateTimeFieldTopTable"
var Responsavel         = "#Respons_x00e1_vel_704e1c3b-092b-4e4f-94ea-8c183ea50ae1_\\$ClientPeoplePicker"
// Convocações
var tdConvocado1 = "#Convocado_x0020_1_ad187035-23e5-4d60-bdca-7e2cbc8bc33d_\\$ClientPeoplePicker"
var tdConvocado2 = "#Convocado_x0020_2_856141e9-6224-454c-8439-6481388850fc_\\$ClientPeoplePicker"
var tdConvocado3 = "#Convocado_x0020_3_469464ba-ca3e-44ee-a8c2-84fa25c97273_\\$ClientPeoplePicker"
var tdConvocado4 = "#Convocado_x0020_4_393090ad-132f-43e0-831b-b33d3b4cec35_\\$ClientPeoplePicker"
var tdConvocado5 = "#Convocado_x0020_5_4d4f2c64-882a-4513-875f-70c4d8609f10_\\$ClientPeoplePicker"
var tdConvocados = "#Outros_x0020_Convocados_391c0928-7d60-408e-abf0-7cda2a7c4875_\\$ClientPeoplePicker"

var allInputs = [Titulo, Solicitante, Secao, Gerente, Departamento, Tempo, 
                Assunto, Proposta, Responsavel, Prazo, Justificativa, Comentarios, Abrangencia, Investimento, Retorno]
var TRs = []
var allConvocados = [ tdConvocado1, tdConvocado2, tdConvocado3, tdConvocado4, tdConvocado5, tdConvocados ]

var AttachTR, Buttons, AttachWhole

//botões adição e edição
var saveButton = "input[id$='_ctl00_ctl00_diidIOSaveItem']"
var backButton = "input[id$='_ctl01_ctl00_diidIOGoBack']"

var tableButtons        = "#ctl00_ctl32_g_48156993_b15d_4005_9376_a768075595ab_ctl00_toolBarTbl"
var editTableButtons    = "#ctl00_ctl32_g_6ef8b845_7ebd_4971_bdfa_df47ca771ec9_ctl00_toolBarTbl"
//Anexos
var attachtable         = "#idAttachmentsRow"
var attach              = "#partAttachment" 
var attackButton        = "#attachOKbutton" 
//botão de toggle anexos
var toggleButton =  '<br>' + 
                    '<div>' +
                        '<a style="color:white" class="btn btn-outline-info waves-effect" onclick="toggleAttach()">' +
                            'Anexar Arquivos' +
                        '</a></div>' + 
                    '<br><br>'

//Para Exibição - pega títulos
var exibTitle               = "a[name='SPBookmark_Title']"
var exibSolicitante         = "a[name='SPBookmark_Solicitante']"
var exibGerente             = "a[name='SPBookmark_Gerente']"
var exibAssunto             = "a[name='SPBookmark_Assunto']"
var exibProposta            = "a[name='SPBookmark_Proposta']"
var exibJustificativa       = "a[name='SPBookmark_Justificativa']"
var exibComentarios         = "a[name='SPBookmark_Coment_x00e1_rios']"
var exibAbrangencia         = "a[name='SPBookmark_Abrang_x00ea_ncia']"
var exibInvestimento        = "a[name='SPBookmark_Investimento']"
var exibDepartamento        = "a[name='SPBookmark_Departamento']"
var exibSecao               = "a[name='SPBookmark_Se_x00e7__x00e3_o']"

var exibResponsavel         = "a[name='SPBookmark_Respons_x00e1_vel']"
var exibPrazo               = "a[name='SPBookmark_Prazo']"
var exibRetorno             = "a[name='SPBookmark_Retorno']"
var exibTempo               = "a[name='SPBookmark_Tempo_x0020_necess_x00e1_rio_x00']"

var exibConvocado1        = "a[name='SPBookmark_Convocado_x0020_1']"
var exibConvocado2        = "a[name='SPBookmark_Convocado_x0020_2']"
var exibConvocado3        = "a[name='SPBookmark_Convocado_x0020_3']"
var exibConvocado4        = "a[name='SPBookmark_Convocado_x0020_4']"
var exibConvocado5        = "a[name='SPBookmark_Convocado_x0020_5']"
var exibConvocados        = "a[name='SPBookmark_Outros_x0020_Convocados']"

var allExibs = [exibTitle, exibSolicitante, exibSecao, exibGerente, exibDepartamento, exibTempo,
                exibAssunto, exibProposta, exibResponsavel, exibPrazo, exibJustificativa, exibComentarios, exibAbrangencia, exibInvestimento, exibRetorno,
                exibConvocado1, exibConvocado2, exibConvocado3, exibConvocado4, exibConvocado5, exibConvocados]

var exibAttach      = "#idAttachmentsRow"
var exibCancel      = "#ctl00_ctl32_g_3424b63f_d596_42de_8757_f1ba53cbab51_ctl00_toolBarTbl_RightRptControls_ctl01_ctl00_diidIOGoBack"
var exibButtons     = "#ctl00_ctl32_g_3424b63f_d596_42de_8757_f1ba53cbab51_ctl00_toolBarTbl"

// Funções de Depto/Seção
var DepartamentoID  = "#Departamento_144374bf-4a1c-4209-9b93-0f72c693e125_\\$TextField"
var SecaoID         = "#Se_x00e7__x00e3_o_64476c92-9055-423c-829b-a22a8b397f03_\\$TextField"
var DeptoFormValue  = "ClientFormPostBackValue_1647ebf9-4f66-455f-a5d4-e5ba810a3844_Departamento"
var SecaoFormValue  = "ClientFormPostBackValue_1647ebf9-4f66-455f-a5d4-e5ba810a3844_Se_x00e7__x00e3_o"
var DeptoValue
var SecaoValue
var arrayAreas = []
var arrayMotores = []

//redirecionar página
var postbackUrlAdd = "https://intranet.weg.net/br/motores/controle-qualidade/Lists/COMISSO%20DA%20QUALIDADE%202/NewForm.aspx?Source=https://intranet.weg.net/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx"
var postbackUrlEdit = "https://intranet.weg.net/br/motores/controle-qualidade/Lists/COMISSO%20DA%20QUALIDADE%202/EditForm.aspx?ID="
var postbackCancel = "https://intranet.weg.net/br/motores/controle-qualidade/wiki/ComissaoQualidade.aspx"


var k=0;