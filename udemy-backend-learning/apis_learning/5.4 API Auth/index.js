import express from "express";
import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "qwertrewq123321";
const yourPassword = "qwertrewq123321";
const yourAPIKey = "6aaa217b-14d9-4e72-bf22-58f6689aea33";
const yourBearerToken = "487625c3-cbbd-4e1a-b8f4-dacf8e633973";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random")
    console.log(JSON.stringify(response.data))
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error(error)
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
  axios.get(URL, {
    auth: {
      username: "abc",
      password: "123",
    },
  });
  */
 const url = "https://secrets-api.appbrewery.com/all?page=2"

 try {
  
   const response = await axios.get(url,{auth:{username:yourUsername, password:yourPassword}})
   console.log(response.data);
   res.render("index.ejs", { content: JSON.stringify(response.data) });

 } catch (error) {
  console.error(error)
  
 }





});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const url = "https://secrets-api.appbrewery.com/filter"

  try {
  
    const response = await axios.get(url,{params:{score:5, apiKey:yourAPIKey}})
    console.log(response.data);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
 
  } catch (error) {
   console.error(error)
   
  }

});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const id = 42
    const url = `https://secrets-api.appbrewery.com/secrets/${id}`
    const response = await axios.get(url, {headers:{Authorization:`Bearer ${yourBearerToken}`}})
    console.log(response.data);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
 
  } catch (error) {
   console.error(error)
   
  }


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
