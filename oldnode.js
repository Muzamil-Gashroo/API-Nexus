// const http = require('http');

// const fs = require('fs');
// const { url } = require('inspector');
// const os = require('os');

// http://127.0.0.1:8000/
// var count = 0;

// const server = http.createServer(
//     (req,res) => {
        
//         const ipadd = req.socket.remoteAddress;
//         const date_format = new Date().toLocaleString();
        
        // const hedd = req.headers ;
        // const url = new URL (req.url, `http://${req.headers.host}`);

        // const lat = url.searchParams.get(`lat`);
        // const long = url.searchParams.get(`long`);
        
        // let oss = os.cpus().length;
        // // let osst = os.cpus().toLocaleString();
        
//         fs.appendFile("./logs.txt",  `IP: ${ipadd} - DATE: ${date_format} - CPU : ${oss}  \n`, (err)=>{}  );
        

//         console.log("System working ");
        
        
//         res.end(` Server is On ${ipadd}, Date ${date_format} CPU CORE : ${oss} `)   
//     }
// );

// server.listen(8000,
//      ()=> console.log("looks fine")
// );