// Global Test text for automation
const test_email = 'test';
var test_first_name = 'testFirst';
var test_last_name = 'testLast';
var test_full_name = 'testFull';
var test_phone = '123';
var test_confirm_email = 'testConfirm';
var test_additional = 'testAdd';

// API url for hosting php file
const api_url = "https://newsletter.thefastech.com/api.php";

// Global html tags
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input[type=submit]');
const selects = document.querySelectorAll('select');
var dropdowns = [];
var additional = [];
var radios = [];
var button_id = null;


// Triggers
btns.forEach(btn => {
   btn.addEventListener('click', event => {
	   	var form = btn.form;
	   	button_id = btn.id;
	   	getData(form);
   });
});

inputs.forEach(inp => {
   inp.addEventListener('click', event => {
	   	var form = inp.form;
	   	button_id = inp.id;
	   	getData(form);
   });
});

selects.forEach(select => {
   select.addEventListener('change', event => {
		dropdowns.push({id:select.id, class:select.name});
   });
});

// Main function to fetch data
function getData(form){

	   	var email = form.querySelector('input[type="email"]');
	    	
	   	if(email == null){
	   		var tags = form.querySelectorAll('input[type="text"]');
	   		for(var i=0; i<tags.length; i++){
	   			if (tags[i].value == test_email) 
	   			{
	   				email = tags[i];
	   				break;
	   			}
	   		}
	   	}

	   	// alert(email.value);

	   	if(email.value == test_email){

	   		console.log('Form saved for', document.location.href);
	   		console.log('Form ID:',form.id);
	   		console.log('------EMAIL VALUES-----');
	   		console.log(email.id,'with value of:',email.value);
	   	

	   		var texts = form.querySelectorAll('input');
	   		var text_fields = [];
	   		console.log('------TEXT VALUES------');
			for (var value of texts) {
			    console.log(value.id,'with value of:', value.value);
			    if(value.value == test_first_name){
			    	test_first_name = value;
			    }
			    if(value.value == test_last_name){
			    	test_last_name = value;
			    }
			    if(value.value == test_full_name){
			    	test_full_name = value;
			    }
			    if(value.value == test_phone){
			    	test_phone = value;
			    }
			    if(value.value == test_confirm_email){
			    	test_confirm_email = value;
			    }
			    if(value.value == test_additional){
			    	additional.push({id:value.id, class:value.name});
			    }
			}

			var checkboxes = form.querySelectorAll('input[type="checkbox"]');
			var check_fields = [];
			console.log('-----CHECKBOX VALUES------');
			for (var value of checkboxes) {
			    console.log(value.id,'with value of:', value.checked);
			     if(value.checked){
			    	check_fields.push(value.name);
			    }
			}

			var radio_tags = form.querySelectorAll('input[type="radio"]');
			for (var value of radio_tags) {
			     if(value.checked){
			    	radios.push(value.name);
			    }
			}

			apicall(document.location.href, document.title, form.id, form.className, email.id,
			 email.name, test_first_name.id, test_first_name.name, test_last_name.id, test_last_name.name,
			  test_full_name.id, test_full_name.name, test_phone.id, test_phone.name, test_confirm_email.id, test_confirm_email.name, check_fields);

	   	}
}

// Function connected to API
function apicall (url, title, form_id, form_class, email_id = null, email_class = null, first_name_id = null,
 first_name_class = null, last_name_id = null, last_name_class = null, full_name_id = null,
  full_name_class = null, phone_id = null, phone_class = null, confirm_email_id = null, confirm_email_class = null, checkboxes = null){

	var xhr = new XMLHttpRequest();
      xhr.open("POST", api_url, true);
      xhr.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
      xhr.send(
        JSON.stringify({
          url: url,
          title: title,
          form_id: form_id,
          form_class:form_class,
          email_id: email_id,
          email_class:email_class,
          first_name_id: first_name_id,
          first_name_class: first_name_class,
          last_name_id: last_name_id,
          last_name_class: last_name_class,
          full_name_id: full_name_id,
          full_name_class: full_name_class,
          phone_id: phone_id,
          phone_class:phone_class,
          confirm_email_id: confirm_email_id,
          confirm_email_class: confirm_email_class,
          dropdowns: dropdowns,
          checkboxes:checkboxes,
          additional:additional,
          radios: radios,
          button_id: button_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	console.log(xhr.response);
        }
      };
}

// Message passing
// Response from database, running automation
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	
	if(message.state == 1){
		window.location.href = message.data.url;
	}else{

		data = message.data;

		// Email Field
	  	if(data.email_field_id){
	  		document.getElementById(data.form_id).focus();
	  		document.getElementById(data.email_field_id).value = message.email;
	  	}else{
	  		// To be implemented
	  	}

	  	if(data.first_name_id){
	  		document.getElementById(data.first_name_id).value = message.first_name;
	  	}else{

	  	}

	  	if(data.last_name_id){
	  		document.getElementById(data.last_name_id).value = message.last_name;
	  	}else{

	  	}

	  	if(data.confirm_email_id){
	  		document.getElementById(data.confirm_email_id).value = message.email;
	  	}else{

	  	}
	  	
	  	if(data.checkboxes){
	  		data.checkboxes = JSON.parse(data.checkboxes);
	  		for (var value of data.checkboxes) {
			    document.getElementsByName(value)[0].checked = true;
			}
	  		
	  	}

	  	if(data.button_id){
	  		document.getElementById(data.button_id).focus();
	  		document.getElementById(data.button_id).click();
	  	}




	}
  
}
