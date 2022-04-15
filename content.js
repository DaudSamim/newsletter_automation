const test_email = 'test';
var test_first_name = 'testFirst';
var test_last_name = 'testLast';
var test_full_name = 'testFull';
var test_phone = '123';


const api_url = "https://newsletter.thefastech.com/api.php";

const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input[type=submit]');

btns.forEach(btn => {
   btn.addEventListener('click', event => {

	   	var form = btn.form;
	   	
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

	   	if(email.value == test_email){

	   		console.log('Form saved for', document.location.href);
	   		console.log('Form ID:',form.id);
	   		console.log('------EMAIL VALUES-----');
	   		console.log(email.id,'with value of:',email.value);
	   		// var data = new FormData(form);
	   		var texts = form.querySelectorAll('input');
	   		var text_fields = [];
	   		console.log('------TEXT VALUES------');
			for (var value of texts) {
			    console.log(value.id,'with value of:', value.value);
			    if(value.value == 'testName'){
			    	 text_fields.push(value.id);
			    }
			   
			}

			var checkboxes = form.querySelectorAll('input[type="checkbox"]');
			var check_fields = [];
			console.log('-----CHECKBOX VALUES------');
			for (var value of checkboxes) {
			    console.log(value.id,'with value of:', value.checked);
			    if(value.checked == true){
			    	check_fields.push(value.id);
			    }
			}

			apicall(document.location.href, document.title, form.id, form.className, email.id,
			 email.className, first_name.id, first_name.className, last_name.id, last_name.className,
			  full_name.id, full_name.className, phone.id, phone.className, additional_fields, check_fields);

			
	   	}

   });
});

inputs.forEach(inp => {
   inp.addEventListener('click', event => {
   		event.preventDefault();
	   	var form = inp.form;
	   	
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
			}

			var checkboxes = form.querySelectorAll('input[type="checkbox"]');
			var check_fields = [];
			console.log('-----CHECKBOX VALUES------');
			for (var value of checkboxes) {
			    console.log(value.id,'with value of:', value.checked);
			     if(value.checked == true){
			    	check_fields.push(value.name);
			    }
			}

			apicall(document.location.href, document.title, form.id, form.className, email.id,
			 email.name, test_first_name.id, test_first_name.name, test_last_name.id, test_last_name.name,
			  test_full_name.id, test_full_name.name, test_phone.id, test_phone.name, [], check_fields);

	   	}

   });
});


function apicall (url, title, form_id, form_class, email_id = null, email_class = null, first_name_id = null, first_name_class = null, last_name_id = null, last_name_class = null, full_name_id = null, full_name_class = null, phone_id = null, phone_class = null, additional_fields = null, checkboxes = null){

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
          additional_fields: additional_fields,
          checkboxes:checkboxes,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	console.log(xhr.response);
        }
      };
}