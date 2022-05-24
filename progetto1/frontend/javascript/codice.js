//file json
var serverData = [];


var nextID = 10006;


//crea tabella
function tabellaCodice() {
  
  // var pagina = $("input#pagina").val()
  // $.get("http://localhost/progetto1/backend/employees.php?page="+pagina, function (msg) {
  //   //console.log(msg["_embedded"]["employees"]);
  //   serverData = msg;
  //   var righe = "";
  //   $.each(serverData, function (key, value) {
  //   righe = righe + "<tr>";
  //   righe = righe + "<th>" + value.id + "</th>";
  //   righe = righe + "<td class ='nome'>" + value.first_name + "</td>";
  //   righe = righe + "<td class ='cognome'>" + value.last_name + "</td>";
  //   righe = righe + "<td class ='genere'>" + value.gender + "</td>";
  //   righe = righe + "<td>" + "<input type='button' class='btn btn-outline-warning' value='MODIFICA' onclick='modifica(" + value.id + ")' data-bs-toggle='modal' data-bs-target='#exampleModal1' data-bs-whatever='@mdo' 'id='" + nextID + "'>";
  //   righe = righe + "<br> <br>" + "<input type='button' class='btn btn-danger' value='RIMUOVI' onclick='elimina(" + value.id + ")' id='" + value.id + "'>";
  //   righe = righe + "</tr>";
  //   });
  // $("#tbody").html(righe);
   
  // });

  var editor;

  $("#table").DataTable({
    serverSide: true,
    ajax:{url:"../backend/datatable.php"},
    columns:[{data:"id"},{data:"first_name"},{data:"last_name"},{data:"gender"}], 


    select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            {
                extend: "selected",
                text: 'Delete',
                action: function ( e, dt, node, config ) {
                    var rows = table.rows( {selected: true} ).indexes();
 
                    editor
                        .hide( editor.fields() )
                        .one( 'close', function () {
                            setTimeout( function () { // Wait for animation
                                editor.show( editor.fields() );
                            }, 500 );
                        } )
                        .edit( rows, {
                            title: 'Delete',
                            message: rows.length === 1 ?
                                'Are you sure you wish to delete this row?' :
                                'Are you sure you wish to delete these '+rows.length+' rows',
                            buttons: 'Delete'
                        } )
                        .val( 'users.removed_date', (new Date()).toISOString().split('T')[0] );
                }
            }
        ]

  });






























}

$(document).ready(function () {

    tabellaCodice();

});

function elimina(id) {
  $.ajax({
      url:"http://localhost/progetto1/backend/employees.php?id="+id,
      type: "DELETE",
      success: tabellaCodice()
  })
}



function modifica(id){
  console.log(id)

  var riga = $("#" + id).closest("tr");
  var nome = riga.find(".nome").text();
  console.log(nome);
  var cognome = riga.find(".cognome").text();
  console.log(cognome);
  var genere = riga.find(".genere").text();
  console.log(genere);

  $("input#name1").val(nome);
  $("input#lastname1").val(cognome);
  $("input#gender1").val(genere);

  $("input#daModificare").val(id);
}

function effettuaModifica(){
  var nome = $("input#name1").val();
  var cognome = $("input#lastname1").val();
  var genere = $("input#gender1").val();
  var id = $("input#daModificare").val();
  
  console.log(genere);
  console.log(nome);
  console.log(cognome);
  $.ajax({
    type: "PUT",
    url: "http://localhost/progetto1/backend/employees.php?id="+id,
    contentType: "application/json",
    data: JSON.stringify({ "first_name": nome, "gender": "M", "id": id,"last_name": cognome}),
    success: function(){
      
      tabellaCodice();
    }
  })
}


function aggiungiDipendente(){
  var nome = $("input#name").val();
  var cognome = $("input#lastname").val();
  var genere = $("input#gender").val();
  
  console.log(genere);
  console.log(nome);
  console.log(cognome);
  $.ajax({
    type: "POST",
    url: "http://localhost/progetto1/backend/employees.php",
    contentType: "application/json",
    data: JSON.stringify({ "first_name": nome, "gender": "M","last_name": cognome}),
    success: function(){
                  
                  tabellaCodice();
    }
  })
}

function vaiAllaPagina(){
    tabellaCodice();
}
