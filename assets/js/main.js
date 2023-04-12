const sendMessage = async()=>{
    const message = document.getElementById('message').value
    
    
    let userdiv = document.createElement("div")
    // <i class="fas fa-cloud"></i>
    userdiv.classList.add('user-msg')
    userdiv.append(message)
    document.getElementById("all-msg").appendChild(userdiv);
    document.getElementById('message').value = ""   
    // document.getElementById('usr-msg').innerHTML = message
    console.log("message",message)
    // const data ={name:"sahil"}
    let url  = "http://localhost:3100/api/chat";
    
    const response = await fetch(url,
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({message:message})
        })
    let data = response.json().then(data=>{
      console.log(data)
      let boatdiv = document.createElement("div");
      boatdiv.append(data.data);
      document.getElementById("all-msg").appendChild(boatdiv);
      // const scroller = document.querySelector("#main-section");
  

        // document.getElementById('boat-msg').innerHTML = data.data
    })
    // console.log("response",response.json().then(data=>{
    //     console.log
    // }))
        
    // $.ajax(request).done(function(response){
    //     alert("Data Updated Successfully!");
    // })
    // await axios.post('http://localhost:3000/api/chat',{name:"sahil"})
    // .then(function(response){
    //     res.render('index', { users : response.data });
    // })
    // .catch(err =>{
    //     res.send(err);
    // })
    
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  