d3.json("./samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;

});

function dropDownMenu() {
    
    // select the dropdown menu
    var dropdown = d3.select("#selDataset");

    // load data
    d3.json("./samples.json").then((data)=> {

        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value");
        });
    });
}

dropDownMenu();