console.log('Cumpleaños');

let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

let fechaAux = "";
if (month < 10) {
    fechaAux = (`${year}-0${month}-${day}`);
} else {
    fechaAux =(`${year}-${month}-${day}`);
}

console.log(fechaAux);

cumpleHoy();
cumpleMes();


function cumpleHoy() {
    const URL = 'http://192.168.1.96/api/resource/Employee?fields=["employee_name","date_of_birth"]';   

    fetch(URL,
        {
            method:'GET',
            headers:{
                'Authorization' : 'token 8a9a199fdad9d55:013abe80fecb27b',
            },
        }
    )
        
        .then(res => res.json())
        .then(data => {
            FestejadosHoy(data.data);
        })
}

function FestejadosHoy(_data) {
    $("#dvEmpleados").empty();

    var _tblStr = "";

    var arrayFilter=[];
    for(var i=0; i<_data.length; i++){
        var aux=_data[i].date_of_birth.split("-");
        if(parseInt(aux[1])==month && parseInt(aux[2])==day)
            arrayFilter.push(_data[i]);
    }

    for (var i = 0; i < arrayFilter.length; i++) {
        _tblStr += "<p class='cssFontB1'>" + arrayFilter[i].employee_name + "</p>"; //Here cambiar el nombre del campo
    }

    _tblStr += " <br />";
    _tblStr += " <span class='cssFontB1 cssFechaHoy'>"+ (day<10 ? ("0"+day) : day) + "-" + getNameMes(month) + "-" + year + "</span>";

    $("#dvEmpleados").html(_tblStr);
}

function getNameMes(_month) {
    var _result = "";
    if (_month == 1) {
       _result = "Ene";
    } else if (_month == 2) {
       _result = "Feb";
    }  else if (_month == 3) {
        _result = "Mar";
    } else if (_month == 4) {
        _result = "Abr";
    } else if (_month == 5) {
        _result = "May";
    } else if (_month == 6) {
        _result = "Jun";
    } else if (_month == 7) {
        _result = "Jul";
    } else if (_month == 8) {
        _result = "Ago";
    } else if (_month == 9) {
        _result = "Sep";
    } else if (_month == 10) {
        _result = "Oct";
    } else if (_month == 11) {
        _result = "Nov";
    } else if (_month == 12) {
        _result = "Dic";
    }
    return _result;
}

function cumpleMes() {
    const URL2 = 'http://192.168.1.96/api/resource/Employee?fields=["employee_name","date_of_birth"]'; 

    fetch(URL2,  
    {
	    method:'GET',
	    headers:{
		    'Authorization' : 'token 8a9a199fdad9d55:013abe80fecb27b',
	    },
    })
        .then(res => res.json())
        .then(data => {
            FestejadosMes(data.data);
        })
}

function FestejadosMes(_data) {
    $("#contentMes").empty();
    
    var _tblStr = "";

    var arrayFilter=[];
    for(var i=0; i<_data.length; i++){
        var aux=_data[i].date_of_birth.split("-");
        if(parseInt(aux[1])==month)
            arrayFilter.push(_data[i]);
    }

    for (var i = 0; i < arrayFilter.length; i++) {

        _tblStr += " <div class='cssPanel'>";
        _tblStr += "    <div class='cssPanelItemMes' style='display:flex'>";
        _tblStr += "        <div class='cssPnlName'>";
        _tblStr += "            <p class='cssFontB2'>"+ arrayFilter[i].employee_name +"</p>";
        _tblStr += "        </div>";
        _tblStr += "        <div class='cssPnlFecha'>";
        _tblStr += "            <div class='cssFontB2Fecha'>";

        var fec = arrayFilter[i].date_of_birth.split("-");
        _tblStr += (fec[2].length < 2 ? "0" + fec[2] : fec[2]) + "/" +getNameMes(parseInt(fec[1]));

        _tblStr += "            </div>";
        _tblStr += "        </div>";
        _tblStr += "    </div>";
        _tblStr += " </div>";
        _tblStr += " <br />";

        
    }
    
    $("#contentMes").html(_tblStr);
}