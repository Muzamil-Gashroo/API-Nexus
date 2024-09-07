const express = require('express');

const app = express();

const os = require('os');

const fs = require('fs');

const users = require("./MOCK_DATA.json");

const PORT = 8000;

app.listen(PORT, ()=>{console.log(`Server On ${PORT}`)});



// Plugin -- Middleware

app.use(express.urlencoded({extended: false}));
  
  // Restful API's
  
  //users

  app.route("/users")

  .get((req,res)=>
    {
          const html = ` 
          <ol> 
           ${ users.map((user)=>`<li> 
            Name: ${user.first_name}-${user.last_name}, 
            <br>
            Email: ${user.email}
            </li>`).join("")
          }  
          </ol> `          

          res.send(html);

    })
   .post((req,res)=>{

    const body = req.body;

    // console.log(body);

    users.push({ ...body, id: users.length + 1 });

    // data saves for temp time while server is on , we update data on users
    // Tricky here memory management part
    // if ya wanna save that then we use write file for it - where we have to make our objects into string 

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{ return res.json({
      
      status:"Succes", id: users.length

    })});

   });
    

  //users/:id

   app.route("/users/:id")
   
   .get((req,res)=>
    {

      const id = Number(req.params.id);

      const user_database = users.find((user)=> user.id === id);
      
      const user_html = `<ul>
        
       ${`<li>Name: ${user_database.id}</li>`} 
       ${`<li>Name: ${user_database.first_name}-${user_database.last_name}</li>`} 
       ${`<li>Email: ${user_database.email}</li>`} 
       ${`<li>Gender: ${user_database.gender}</li>`} 

      </ul>`;

      res.send(user_html);
      
    })
    .patch((req,res)=>{
          
      const id = Number(req.params.id);
      
      let user_database = users.find((user)=> user.id === id);
      
      const body = req.body;

      const update_user =  { ...user_database, ...body };

      update_user.id = id;

      users[id-1] = update_user; // updating database

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{

        return res.json({status:`updated successfully - ID: ${id}`})

      })

    })
    .delete((req,res)=>{
       
      const id = Number(req.params.id);
      
      let delete_user = users.find((user)=> user.id === id);
      
      users[id-1] = null;


      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{

        return res.json({status:`Deleted successfully - ID: ${id}`})

      })


    });

    
   //api/users

   app.get("/api/users", (req,res)=>
    {
          return res.json(users);
        //   res.json(users);

    });


  // api/users/:id


   app.get("/api/users/:id", (req,res)=>
    {

      const id = Number(req.params.id);

      const user = users.find((user)=> user.id === id);

      res.json(user);
      
    });


