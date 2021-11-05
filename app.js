document.getElementById('dateToday').innerHTML = new Date().toJSON().slice(0,10).replace(/-/g,'/');
var fname = document.getElementById('fullname');
let subNb = document.getElementById('subjectsNum');
var total = avg = 0, dataDetails = msg = "";
let subjectsArray = [], gradesArray = [];

// Create table of inputs
document.getElementById('enterDetails').addEventListener("click", () => {
    if (fname.value != "" && subNb.value != 0) {
        let data = `<table id="datadetails"><tr><th>Subjects</th><th>Grades</th></tr>`;
        for (let i = 0; i < subNb.value; i++) {
            data += `<tr>
                    <td><input type="text" class="form-control" name="subject${i + 1}" id="subjectid${i + 1}" placeholder="Subject ${i + 1} Name"></td>
                    <td><input type="number" class="form-control" name="grade${i + 1}" id="gradeid${i + 1}" placeholder="Grade of Subject ${i + 1}"></td>
                </tr>`;
        }
        document.getElementById('enterDetails').disabled = true;
        document.getElementById('calculateAverage').disabled = false;
        fname.disabled = true;
        subNb.disabled = true;
        document.getElementById('details').innerHTML = `${data} <hr>`;
        document.getElementById('sectionCalculateAverage').style.visibility = 'visible';
        document.getElementById('message').innerHTML = "";
    }
    else
        alert("Please you need to enter the data before you click on the button");
})

// Calculate the SUM & the AVG
document.getElementById('calculateAverage').addEventListener("click", () => {
    // put the subjects and grades in the arrays.
    for (let i = 0; i < subNb.value; i++) {
        subjectsArray[i] = document.getElementById(`subjectid${i + 1}`).value;
        gradesArray[i] = document.getElementById(`gradeid${i + 1}`).value;
        total += Number(gradesArray[i]);
    }
    avg = total / subNb.value;
    dataDetails = `<h6 style="color: var(--h1-bg-color); font-weight: bold;">
    <span style="color: #dc3545 !important;">Full Name: </span>
    ${fname.value}
    <span style="color: var(--table-heiding-color) !important;">|</span>
    <span style="color: #dc3545 !important;"> Total: </span>
    ${total} 
    <span style="color: var(--table-heiding-color) !important;">|</span>
    <span style="color: #dc3545 !important;"> Average: </span>
    ${avg.toFixed(2)} </h6>`;
    document.getElementById('enterDetails').disabled = false;
    document.getElementById('calculateAverage').disabled = true;
    // Show the bootstrap message 
    msg = AvgMessage(msg, avg.toFixed(2));
    document.getElementById('message').innerHTML = `${msg}`;

    total = avg = 0;
    fname.disabled = false;
    fname.value = "";
    subNb.disabled = false;
    subNb.value = 0;
})

function AvgMessage(message, average) {
    switch (true) {
        case (average < 0): return message = `<div class="alert alert-danger" role="alert">
        Enter a valid grade</div>`;
        case (average < 50): return message = `<div class="alert alert-danger" role="alert">
            ${dataDetails} Unfortunately you failed!</div>`;
        case (average <= 60): return message = `<div class="alert alert-warning" role="alert">
            ${dataDetails} Congratulations, you passed but you have to work better</div>`;
        case (average <= 80): return message = `<div class="alert alert-primary" role="alert">
            ${dataDetails} Congratulations, you succeeded</div>`;
        case (average <= 100): return message = `<div class="alert alert-success" role="alert">
            ${dataDetails} Congratulations, you’ve achieved an excellent score!</div>`;
        default:
            console.log("exit from switch");
            return message = `<div class="alert alert-danger" role="alert">
            Enter a valid grade</div>`;
    }
}
