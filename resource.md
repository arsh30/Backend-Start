abc2gmail.com

//[vs code is our backend]

<!-- for general information -->
<!-- Node is not server (we can make server through this) -->
<!-- for password -> we use jwt -->

basic commands -> 1) npm init -y (means some time it will ask permission to access so for this apne aap hojega)
2) -> install express-> npm i express (and requires)
3)const app = express();  -> we create the server
4) app.listen('5000', function () {  -> to start this we listen this continously the port No

<!-- basic steps before creating a server 2 - 4 every time then the function starts to write this need-->

START SERVER: node app.js  && to exit server press : ctrl + c
search-> localhost:portno
(local host jo ip address leta hai vo loopback ip address hota h): 
eg-> LOCALHOST -> search kra local host domain pr then vo search krega address or jo milgya vo dedega but 
when we write localhost means it will directly come on our computer and serve the files ie called loop back ip address 

PORT number-> it is gateway in our computer which helps app to communiate with their servers.eg
whatsapp web -> the port has assigned to to whatsapp server when they need to communicate to server 
vo gate open krega or info dega. imp -> har app ko port no mila hota hai app.listen we create the gateway mean any client can communicate through this

<!-- ============================================================ -->

<!-- BASIC FUNCTIONS START -->
1) app.get("/",(req,res)){   //isme callback function pass krte hai
    agar kuch response na bhjo to cannnot get aaajega
    1.1 -> jo client vo kuch details FE pr dalega to vo req pr aayegi
    }
2) app.get('/home', function (req, res) {  //with '/' or without '/' both are same
    console.log(req);   //req is also a object , isse pta lgta hai konsi request hai,or konsa server hai konsa method hai
    res.send('<h1>hello</h1>');     //we send the html also automatically append in html
    res.exit();  //ab or koi res nahi aayega
    })

3) let obj = {
    "name" : "Arshdeep Singh"  //send this from front End
}
3.1) app.get('/user', function (req, res) {  //1st param is routes
    res.send(obj);
    // res.json(obj);  both are same send and json (json means we send message to the client in json format)
})

//NOTE: -> server abhi close krke dubara on krna pdh rha hai so we install [npm i nodemon -g] then in terminal nodemon app1.js

<!-- ============================================================== -->
 // TO SEND WHOLE HTML FILE
4) app.get('/home', function (req, res) {
    // res.sendFile("C:\Users\HP\Desktop\Backend\foodApp\views\index.html");  //isme hm full path bhjte hai folder ka  -> copy path

    // note: by not sending such a long route we will send by __dirname
    res.sendFile('./views/index.html', { root: __dirname });
    // index.html it is relative path , we know that the file is in which folder  but our server doesnot know  in which directory they will have to find.
    // so we will have to send the root and pass the directory name
})

[NOTE:] ->[RES.SEND do 2 works 1st that automatically detects the [STATUS_CODE] and [CONTENT_TYPE] content means text hai or further has a h1 tag it will convert it in h1 tag]

<!-- STATUS CODE -->
IT Describe the behaviour of the browser gets eq page not found , 404 error means this status is tell us that the page does not exist
it ranges from 100 - 500
types of status: ->  100 -> information status code, 200 -> ok or success code
3) 300 ->  redirect-> means /home route -> after some time we change the route to /about
4) 400- > user error 5) 404- > page not found
6) 502 -> bad gateway

<!-- METHODS-> crud -->
1) Get -> data mangwana
2) Post -> data bhjna upload krna
3) Patch -> data update
4) Delete -> data delete  
POSTMAN: it replaces the frontend part direct url hit on the postman

<!-- SERVER.JS================================== -->

app.listen('5000', function () {
    console.log("server is listening on 5000");
})

app.use(express.json());  //when we send all request like get post update delete so this line first come and execute before other  functions use  . so if we not use this line then the data will not read it in json format
                        //   use is a middle ware function: so express that we use and data will come in the express and it will read it in json format
let user = {};

1) app.get('/user', function (req, res) {
    res.json(user);
});

2) app.post('/user', function (req, res) {
    user = req.body;
    console.log(req.body);
    res.send("data has been added successfully")
})

//patch req  [it will update by adding something]
3) app.patch('/user', function (req, res) {  //eg instead of name we have to send the "sex"
    let obj = req.body;   //req.body means jobhi hm front end pr likhte hai vo isme aata hai
    for (let key in obj) {  //for in loop iterates 1 by 1 in the loop  and each iteration yeh key(index ki value dega)
        user[key] = obj;   //user [key] means jo humne object bnaya tha jisme key thi or see that the user has not any key from that name so it will create
                            // usme and make him equal to them
    }
    res.json(user)
})

4)//delete req
app.delete('/user', function (req, res) {
    user = {};
    res.json(user);
})
