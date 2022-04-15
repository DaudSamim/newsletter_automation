const test_email = 'test';
const api_url = "https://newsletter.thefastech.com/api.php";

const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input[type=submit]');

btns.forEach(btn => {
   btn.addEventListener('click', event => {

	   	var form = btn.form;
	   	
	   	var email = form.querySelector('input[type="email"]');
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

			apicall(document.location.href, document.title, form.id, form.className, email.id, text_fields, check_fields,'');

			
	   	}

   });
});

inputs.forEach(inp => {
   inp.addEventListener('click', event => {
   		event.preventDefault();
	   	var form = inp.form;
	   	
	   	var email = form.querySelector('input[type="email"]');
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

			apicall(document.location.href, document.title, form.id, form.className, email.id, text_fields, check_fields,'');

	   	}

   });
});


function apicall (url, title, form_id, form_class, email_field, text_fields, checkboxes, other_fields){

	var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://newsletter.thefastech.com/api.php", true);
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