var excel = require('excel4node');

// Create a new instance of a Workbook class
var workbook = new excel.Workbook();

var options={
  'sheetFormat': {
    'baseColWidth': 30,
},
}

// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('Sheet 1', options);

function exportExcel(datos){
  let datosRequeridos = {}
    var fila =1
        worksheet.cell(1,1).string("Nombre")
        worksheet.cell(1,2).string("Fecha")
        worksheet.cell(1,3).string("Hora de entrada")
        worksheet.cell(1,4).string("Hora de salida")
    datos.map(x=>{
      let id = x.id
      
      if(x.check_in_time != null && x.departure_time != null){
        fila++
        
        let horaEntrada = x.check_in_time.toLocaleString("en-US", {timeZone: "America/Danmarkshavn"})
        let horaSalida = x.departure_time.toLocaleString("en-US", {timeZone: "America/Danmarkshavn"})

        let matchHours = /\d{2}:\d{2}:\d{2}\sAM|\d:\d{2}:\d{2}\sAM|\d{2}:\d{2}:\d{2}\sPM|\d:\d{2}:\d{2}\sPM/g
        // datosRequeridos[id]={
        //   "entrada": horaEntrada.match(/\d{2}\:\d{2}\:\d{2}/g)[0],
        //   "salida": horaSalida.match(/\d{2}\:\d{2}\:\d{2}/g)[0],
        //   "fecha": horaEntrada.match(/^(.*?)\d{4}/g)[0],
        //   "nombre": x.employee.names + " " + x.employee.last_names
        // }
        // console.log(
        //   x.check_in_time.toLocaleString("en-US", {timeZone: "America/Danmarkshavn"})
        // );
        worksheet.cell(fila,1).string(x.employee.names + " " + x.employee.last_names)
        worksheet.cell(fila,2).string(horaEntrada.match(/^(.*?)\d{4}/g)[0])
        worksheet.cell(fila,3).string(horaEntrada.match(matchHours)[0])
        worksheet.cell(fila,4).string(horaSalida.match(matchHours)[0])
        
        // x.check_in_time.map(x=>{
        //   worksheet.cell(fila,columna).string(x.check_in_time.toString())
        // })
      }
    })
    workbook.write('Excel.xlsx');
    return datosRequeridos
}

module.exports.exportExcel = exportExcel
// module.exports = {exportExcel}