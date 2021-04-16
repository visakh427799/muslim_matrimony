var maritalStatus = {
    "Unmarried": { "No": ["nil"],
    
    },
    "Nikah Divorce": {
    "Yes": ["1", "2","3","more than 3"],
    "No": ["nil"]
    }, "Widowed/Widower": {
        "Yes": ["1", "2","3","more than 3"],
        "No": ["nil"]
    },
    "Divorced": {
        "Yes": ["1", "2","3","more than 3"],
    "No": ["nil"]
        },
        "Awaiting divorce": {
            "Yes": ["1", "2","3","more than 3"],
            "No": ["nil"]
            },
    }


    window.onload = function () {
        var countySel = document.getElementById("mar"),
        stateSel = document.getElementById("chil"),
        districtSel = document.getElementById("num");
        for (var country in maritalStatus) {
        countySel.options[countySel.options.length] = new Option(country, country);
        }
        countySel.onchange = function () {
        stateSel.length = 1; // remove all options bar first
        districtSel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        for (var state in maritalStatus[this.value]) {
        stateSel.options[stateSel.options.length] = new Option(state, state);
        }
        }
        countySel.onchange(); // reset in case page is reloaded
        stateSel.onchange = function () {
        districtSel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        var district = maritalStatus[countySel.value][this.value];
        for (var i = 0; i < district.length; i++) {
        districtSel.options[districtSel.options.length] = new Option(district[i], district[i]);
        }
        }
        }