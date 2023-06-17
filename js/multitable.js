/*
    File: multitable.js
    GUI Assignment: Creating a Multiplication Table with JS
    Ethan Rosenbaum, UML Computer Science, ethan_rosenbaum@student.uml.edu    
    
    Copyright (c) 2023 by Ethan. All Rights reserved. May be
    freely copied or excerpted for educational purposes with credit to the author.

    Header taken from HW assignment 1 example by Wenjin Zhou.
*/

/*
    parseFormInput()
        
    Params:
        id - element id to parse

    Returns:
        Array
        If success:
            [0] - numeric value
            [1] - empty string
        Else
            [0] - NaN
            [1] - error message
*/
function parseFormInput(id) {
    var elem = document.getElementById(id);
    var val  = elem.value;
    var fieldName = elem.getAttribute('name');
    var msg = "";

    // Check empty string
    if (val.length == 0) {
        msg = "<p>" + "ERROR: Invalid input (" + val + ") in " + fieldName + " field.</p>";
        return [val, msg];
    }

    // Parse and validate numeric
    parsed = Number(val);
    if (isNaN(parsed)) {
        msg = "<p>" + "ERROR: Invalid input (" + val + ") in " + fieldName + " field.</p>";
    }

    if (parsed < -50 || parsed > 50) {
        msg = "<p>" + "ERROR: input out of range (" + val + ") [-50, 50] in " + fieldName + " field.</p>";
    }

    return [parsed, msg];
}

/*
    createTable()
    
    Main driver function which is executed on form submission.
    This uses DOM methods to generate a table following validation of the form inputs.

    Params:
        None.

    Returns:
        false - prevents form resubmission. (See comment at return statements.)
*/
function createTable() {
    var error = false;
    var statusMsg = "";

    //
    // Parse inputs, check for errors (return[1]).
    //

    var xmin = parseFormInput("xrangelow");
    if (xmin[1].length > 0) {
        error = true;
        statusMsg += xmin[1];
    } else {
        xmin = xmin[0];
    }

    var xmax = parseFormInput("xrangehi");
    if (xmax[1].length > 0) {
        error = true;
        statusMsg += xmax[1];
    } else {
        xmax = xmax[0];
    }

    var ymin = parseFormInput("yrangelow");
    if (ymin[1].length > 0) {
        error = true;
        statusMsg += ymin[1];
    } else {
        ymin = ymin[0];
    }

    var ymax = parseFormInput("yrangehi");
    if (ymax[1].length > 0) {
        error = true;
        statusMsg += ymax[1];
    } else {
        ymax = ymax[0];
    }

    // Prevents any stale status messags from persisting.
    document.getElementById("status").innerHTML = statusMsg;

    if (error) {
        // See:
        //    https://stackoverflow.com/questions/21617060/content-disappears-immediately-after-form-submitted-and-function-runs
        return false;
    }

    //
    // All good inputs
    //

    // Flip inputs if need be
    if (xmin > xmax) {
        var swap = xmin;
        xmin = xmax;
        xmax = swap;
        statusMsg += "<p>Swapped x-min and x-max values</p>";
    }

    if (ymin > ymax) {
        var swap = ymin;
        ymin = ymax;
        ymax = swap;
        statusMsg += "<p>Swapped y-min and y-max values</p>";
    }

    document.getElementById("status").innerHTML = statusMsg;

    //
    // Code heavily influenced by:
    // https://www.valentinog.com/blog/html-table/
    //

    // Get the div element which will hold the table then clear contents.
    var multitableDiv = document.getElementById("multitable");
    multitableDiv.innerHTML = "";
    
    // Create the new table element.
    var multitable = document.createElement('TABLE');

    // Create the first row - all table headers with X-MIN -> X-MAX values.
    var columnHeaders = multitable.insertRow();
    columnHeaders.appendChild(document.createElement("th"));

    for (let index = xmin; index <= xmax; index++) {
        let th = document.createElement("th");
        let thText = document.createTextNode(index);
        th.appendChild(thText);
        columnHeaders.appendChild(th);
    }

    // Create the rest of the table:
    // <th>Y-VAL</th><td></td><td></td><td></td> etc...
    for (let i = ymin; i <= ymax; i++) {
        let row = multitable.insertRow();

        // Create the header for the row
        let th = document.createElement("th");  
        let thText = document.createTextNode(i);
        th.appendChild(thText);
        row.appendChild(th);

        // Generate the multiples
        for (let j = xmin; j <= xmax; j++) {
            let cell = row.insertCell();
            let val  = document.createTextNode(i * j);
            cell.appendChild(val);
            
        }

        
    }

    // Put the table into the div.
    multitableDiv.appendChild(multitable);

    // See:
    //    https://stackoverflow.com/questions/21617060/content-disappears-immediately-after-form-submitted-and-function-runs
    return false
}