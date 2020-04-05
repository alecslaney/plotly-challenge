function generatePlot(id) {  
    d3.json("./samples.json").then((importedData) => {
        var data = importedData;
        
        // BAR CHART //
        // narrow data to selected ID
        var samples = data.samples.filter(x => x.id === id)[0];
        
        // narrow all data to be displayed to first 10 bacteria
        var bacteriaID = samples.otu_ids.slice(0, 10).reverse();
        var bacteriaCount = samples.sample_values.slice(0, 10).reverse();
        var labels = samples.otu_labels.slice(0, 10).reverse();

        // format y-axis labels
        var yAxisLabels = bacteriaID.map(x => "OTU " + x)
    
        var trace = {
            x: bacteriaCount,
            y: yAxisLabels,
            text: labels,
            marker: {
                color: 'red'
            },
            type:"bar",
            orientation: "h",
        };
    
        var trace = [trace];
        
        // create layout for bar chart
        var layout = {
            title: "Most Frequent Bacteria",
            xaxis: {
                title: 'Bacteria Count',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: 'grey'
                }
            },
            yaxis: {
                title: 'Bacteria ID',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: 'grey'
                }
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        
        Plotly.newPlot("bar", trace, layout);
        // BAR CHART //

        // BUBBLE CHART //
        var bubbleTrace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            mode: "markers"
        };

        var bubbleTrace = [bubbleTrace];
  
        // create layout for bubble chart
        var bubbleLayout = {
            xaxis: {
                title: 'OTU ID',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: 'grey'
                }
            },
            yaxis: {
                title: 'Sample Count',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: 'grey'
                }
            },
            height: 700,
            width: 1500
        };
  
        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
        // BUBBLE CHART //
    });
};

function dropDownMenu() {
    
    // select the dropdown menu
    var dropdown = d3.select("#selDataset");

    d3.json("./samples.json").then((data) => {

        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value");
        });
    
        generatePlot(data.names[0]);
    });
};

// handles dropdown menu change
function optionChanged(id) {
    generatePlot(id);
};

dropDownMenu();