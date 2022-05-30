import { readFileSync } from 'fs';

// JSON file with the data
var data = readFileSync('data.json');

var elements = JSON.parse(data);
const express = require("express");
const app = express();

//To solve the cors issue
const cors = require('cors');

app.listen(process.env.PORT, () => console.log("Server Start at the Port"));

app.use(express.static('public'));
app.use(cors());

//When get request is made, alldata() is clled
app.get('/elements', alldata);

function alldata(request, response) {
    //Returns all information about the elemnts
    response.send(elements);
}

app.get('/elements/:element/', searchElement);

function searchElement(request, response) {
    var word = request.params.elements;
    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    if(elements[word]) {
        var reply = elements[word];
    } else {
        var reply = {
            status: "Not Found"
        }
    }

    response.send(reply);
}
