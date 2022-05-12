 // API url for hosting php file
const api_url = "https://newsletter.thefastech.com/user_api.php";

// Event Listeners
 document.getElementById("submit_btn").addEventListener("click", submit_btn);


 // function calls
 function submit_btn(e){
 	e.preventDefault();
 	var email = document.getElementById("email").value;
 	var first_name = document.getElementById("first_name").value;
 	var last_name =document.getElementById("last_name").value;
 	var message = document.getElementById('message');
 	var re = /\S+@\S+\.\S+/;
 	
 	document.getElementById('message').innerText = 'Waiting For Response';

 	if(email == '' || first_name == '' || last_name == ''){
		message.innerText = 'Above Fields are Required';
		return;
 	}
 	if (!re.test(email)) {
    	message.innerText = "Email Format incorrect";
    	return;
  	}

  	var xhr = new XMLHttpRequest();
      xhr.open("POST", api_url, true);
      xhr.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
      xhr.send(
        JSON.stringify({
        	email: email,
        	first_name: first_name,
        	last_name: last_name,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	var data = JSON.parse(xhr.response)[0];
            // console.log(data);
            // alert(data.url);
            // data.forEach(timeout);
   //          timeout();
   //          var counter = 0;
   //          function timeout() {
   //          	// console.log(item.url);
			//     setTimeout(function () {
			//     		console.log(data[counter].url);
			//       	   var profile_link = data[counter].url;
			//             let params = {
			//               active: true,
			//               currentWindow: true,
			//             };
			//             chrome.tabs.query(params, gotTab);
			//             // alert(data.url);
			//             function gotTab(tabs) {
			//               let msg = {
			//               	state: 1,
			//                 data: data[counter],
			//               };
			            
			//               chrome.tabs.sendMessage(tabs[0].id, msg);
			             
			//             }
			        
			//         counter++;

			//         if(counter < data.length){
			//         	timeout();
			//         }   
			      	
			//     }, 7000);
			// }
            
            var profile_link = data.url;
            let params = {
              active: true,
              currentWindow: true,
            };
            chrome.tabs.query(params, gotTab);
            // alert(data.url);
            function gotTab(tabs) {
              let msg = {
              	state: 1,
                data: data,
              };
              // console.log(tabs[0].id);
              chrome.tabs.sendMessage(tabs[0].id, msg);
             
            }

            setTimeout(function () {
	            let params = {
	              active: true,
	              currentWindow: true,
	            };
	            chrome.tabs.query(params, gotTab);
	            // alert(data.url);
	            function gotTab(tabs) {
	              let msg = {
	              	state: 2,
	                data: data,
	                email:email,
	                first_name:first_name,
	                last_name:last_name,
	              };
	              // console.log(tabs[0].id);
	              chrome.tabs.sendMessage(tabs[0].id, msg);
	             
	            }
	        },6000);


          	message.style.color = "green";
          	message.innerText = "Submitted Successfully";
          	
        }
      };

 }