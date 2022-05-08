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
          	console.log(JSON.parse(xhr.response));
          	message.style.color = "green";
          	message.innerText = "Submitted Successfully";
          	
        }
      };

 }