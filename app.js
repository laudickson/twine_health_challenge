var express = require('express');
var nib = require('nib');
var profiles= require('./twine-health-challenge-patients.json');
calculate_age(profiles)

var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index',
  { title : 'Twine Health Challenge',
    json : profiles }
  );
})
app.listen(3000);
console.log("listening on port 3000")

function calculate_age(patientdata)
{
  today_date = new Date();
  today_year = today_date.getFullYear();
  today_month = today_date.getMonth();
  today_day = today_date.getDate();

  for(var i = 0; i < patientdata.length; i++){
    var patient = patientdata[i];
    var birth_year = patient.birthDate.slice(0,4)
    var birth_month = patient.birthDate.slice(5,7)
    var birth_day = patient.birthDate.slice(8,10)

    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    patient['age'] = age
  }
}
