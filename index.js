console.log("postman clone");

// UTILTY FUNCTIONS
// 1.STRING TO HTML ELEMENT

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// COUNTER FOR NUMBER OF PARAMETERS
let addedParamCount = 0;

// HIDE THE PARAMETER BOX INITIALLY
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// ON CLICK HIDE THE JSONBOX AND SHOW PARAMETER BOX
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// ON CLICK SHOW THE JSONBOX AND HIDE PARAMETER BOX
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// add parameters to DOM for + button
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `
   
                <div class="form-row d-flex my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${
                      addedParamCount + 2
                    }</label>
                    <div class="col-md-4 mx-2">
                        <input type="text" class="form-control" id="parameterKey${
                          addedParamCount + 2
                        }" placeholder="Enter Parameter ${
    addedParamCount + 2
  } Key">
                    </div>
                    <div class="col-md-4 mx-2">
                        <input type="text" class="form-control" id="parameterValue${
                          addedParamCount + 2
                        }" placeholder="Enter Parameter ${
    addedParamCount + 2
  } Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                </div>
   
 `;

  //  add parameters to dom
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  // to delete the parameters
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      //   add a confirm alert
      e.target.parentElement.remove();
    });
  }

  //   ++ count of parameters
  addedParamCount++;
});



let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
 
 document.getElementById('responsePrism').value="Please wait... fetching results";
let url=document.getElementById('urlField').value;

let requestType=document.querySelector("input[name='requestType']:checked").value;
let contentType=document.querySelector("input[name='contentType']:checked").value;


// IF USER SELECTS PARAMETER OPTION INSTEAD OF JSON
if(contentType=='params'){
     data={}; 

   for( i=0;i<addedParamCount+1;i++){
       if(document.getElementById('parameterKey' +(i+1))!=undefined){
      let key=document.getElementById('parameterKey' +(i+1)).value;
      let value=document.getElementById('parameterValue'+(i+1)).value;
      data[key]=value;
       }
   }
   data=JSON.stringify(data);
}


else{
    data=document.getElementById('requestJsonText').value;
}

//    console.log(url);
//    console.log(requestType);
//    console.log(contentType);
//    console.log(data);
   // IF REQUEST TYPE == GET THEN CREATE GET  REQUEST
   if(requestType=='GET'){
      fetch(url,{
        method: 'GET'
      }).then((response)=>response.text())
    .then((data)=>{
        // console.log(data);
        document.getElementById('responsePrism').innerHTML=data;
        Prism.highlightAll();
      }); 
   }


   else{
      
    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.text())
        .then((data) => {
            document.getElementById('responsePrism').innerHTML=data;
            Prism.highlightAll();
        });
   }
});



