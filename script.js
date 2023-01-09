const pincode = document.getElementById("pincode");
const datepic = document.getElementById("date");
const search = document.getElementById("search");
const loading = document.getElementById("load");
const container = document.getElementById("tb");
const tabel = document.getElementById("mytable");
var countCenters = document.getElementById("testdata");
var filterButton = document.getElementById("filter");
var viewFilters = document.getElementById("viewFilters");
tabel.style.display = "none";
var today = new Date();

const getVaccineData = (pincod, date) => {
  var pin = pincod;
  var date = date;

  return (
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin +"&date=" + date)
      // Status Code
      
      .then((response) => {
        if (response.status !== 200) {
          tabel.style.display = "none";
        } 
        return response.json();
      })

      .then((result) => {
        console.log(result.centers)
        for (let x = 0; x < result.centers.length; x++) {
          const name_center= result.centers[x].name;
          const address_center = result.centers[x].address;
          const block_name = result.centers[x].block_name;
          const district_name = result.centers[x].district_name;
          const state_name = result.centers[x].state_name;
          const fee_ty = result.centers[x].fee_type;
          const date = result.centers[x].sessions[0].date;
          const newDiv = document.createElement("tr");
          //All Data
          var res = [
            date,
            name_center,
            address_center,
            block_name,
            district_name,
            state_name,
            fee_ty,
          ];
          i = result.centers[x].sessions[0];
          for (let i = 0; i< res.length; i++) {
            var dup = res[i] + "span";
            console.log(dup);

            var dup = document.createElement("td");
            newDiv.appendChild(dup);
            var dupdata = document.createTextNode(res[i]);
            dup.appendChild(dupdata);
          }
          console.log(dup)

          var sess_data = [
            result.centers[x].sessions.length,
            i.vaccine,
            i.min_age_limit,
            i.available_capacity,
          ];

          console.log(sess_data);
          for (let i = 0; i < sess_data.length; i++) {
            var dup = sess_data[i] + "span";
            console.log(dup)
            var dup = document.createElement("td");
            newDiv.appendChild(dup);
            var dupdata = document.createTextNode(sess_data[i]);
            dup.appendChild(dupdata);
          }
          console.log(dup,dupdata)
          container.append(newDiv);
          tabel.style.display = "";
        }
      })
  );
};

        
var auto_date = today.toISOString();
var mod_auto_date = auto_date.split("-");
var auto_year = mod_auto_date[0];
var auto_month = mod_auto_date[1];
var auto_day = mod_auto_date[2].split("");
var mod_auto_date = auto_day[0] + auto_day[1];
var final_auto_date = `${auto_year}-${auto_month}-${mod_auto_date}`;

//to select pincode
pincode.addEventListener("input", function () {
  var Table = document.getElementById("tb");
    Table.innerHTML = "";
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    var dat = datepic.value || final_auto_date;
    var date_spli = dat.split("-");
    var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;
    console.log("Modified-Date:" + modified_date);
    getVaccineData(pin, modified_date);

  } 
});
//to select date
datepic.addEventListener("input", function () {
  var Table = document.getElementById("tb");
  Table.innerHTML = "";
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    var dat = datepic.value;

    var date_chng = dat.split("-");
    var modified_date = `${date_chng[2]}-${date_chng[1]}-${date_chng[0]}`;
    console.log("Modified-Date:" + modified_date);
    getVaccineData(pin, modified_date);
   } 
  
});