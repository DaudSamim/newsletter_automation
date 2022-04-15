const test_email = 'test';
const test_first_name = 'testFirst';
const test_last_name = 'testLast';
const test_full_name = 'testFull';
const test_phone = '123';


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
			  full_name.id, full_name.className, phone.id, phone.className, additional_fields, checkboxes);

			
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
			    	check_fields.push(value.id);
			    }
			}

			apicall(document.location.href, document.title, form.id, form.className, email.id,
			 email.className, first_name.id, first_name.className, last_name.id, last_name.className,
			  full_name.id, full_name.className, phone.id, phone.className, additional_fields, checkboxes);

	   	}

   });
});


function apicall (url, title, form_id, form_class, email_field, text_fields, checkboxes, other_fields){

	var xhr = new XMLHttpRequest();
      xhr.open("POST", api_url, true);
      xhr.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
      xhr.send(
        JSON.stringify({
          url: url,
          title: title,
          form_id: form_id,
          form_class:form_class,
          email_field:email_field,
          text_fields:text_fields,
          checkboxes:checkboxes,
          other_fields:other_fields,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	console.log(xhr.response);
        }
      };
}