function generatePlots(id) {  
    d3.json("../data/samples.json").then((importedData) => {
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
                color: 'maroon'
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

function generateInfo(id) {
    var demoPanel = d3.select("#sample-metadata");
    demoPanel.html("");

    d3.json("../data/samples.json").then((importedData) => {
        var data = importedData;
        var metadata = data.metadata;
        
        // narrow data to selected ID
        var selection = metadata.filter(x => x.id.toString() === id)[0];

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(selection).forEach((pair) => {   
                demoPanel.append("p").text(pair[0] + ": " + pair[1]);    
        });
    });
}

// handles generating plots based on user-selected ID
function dropDownMenu() {
    var dropdown = d3.select("#selDataset");

    d3.json("../data/samples.json").then((data) => {

        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value");
        });
    
        generatePlots(data.names[0]);
        generateInfo(data.names[0]);
    });
};

// handles dropdown menu change
function optionChanged(id) {
    generatePlots(id);
    generateInfo(id);
};

dropDownMenu();