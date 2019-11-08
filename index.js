var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios")

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your Github username?',
            name: 'username'
        },
        {
            type: 'list',
            message: 'Which color would you prefer',
            choices: ['Blue', 'Red', 'Orange', 'Purple', 'Green'],
            name: 'colorChoice'
        },


    ]).then(response => {
        axios.get("https://api.github.com/users/"+response.username)
            .then(function (info) {
                console.log(info.data)
                fs.writeFile(response.username+ ".md" ,"<h1 style='color:" + response.colorChoice +"'>"
                + response.username + "</h1> <img src=" 
                + info.data.avatar_url + ">"
                + "<p>Bio:" + info.data.bio +"</p>" 
                + "<p>Company:" + info.data.company +"</p>" 
                + "<p>RepoURL:" + info.data.repos_url +"</p>"
                + "<p>Followers:" + info.data.followers +"</p>" 
                + "<p>Following:" + info.data.following +"</p>"
                + "<p>Location:" + info.data.location +"</p>"
                , function(err) {

                    if (err) {
                      return console.log(err);
                    }
                  
                    console.log("Success!");
                  
                  })
            })
    });

