import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';
import {FablerService} from '../../services/fabler_service';) {


@Component({
	selector: 'login',
	template: `
		<section class="login-form-content">
		<form [ngFormModel]="loginForm" (submit)="login($event)">
			<p>
				<label for="username">Username</label>
   				<!-- Using #username, we can identify this input to get the value on the form's submit event -->
   				<input type="text" ngControl="username" placeholder="Username">
   				<label for="password">Password</label>
	   			<!-- Using #password we can identify this input to get its value -->
   				<input type="password" ngControl="password" placeholder="Password">
        	</p>
        	<p>
            	<button type="submit">Submit</button>
        	</p>
    	</form>
		</section>
	`,
	directives: [FORM_DIRECTIVES]
})
export class Login {
	loginForm: ControlGroup;
	constructor(fb: FormBuilder, service:FablerService) {
		this.service = service;
		this.loginForm = fb.group({
			username: ['', Validators.required],
     	 	password: ['', Validators.required]
		});
	}
	login(event) {
		event.preventDefault();
		console.log(this.loginForm.value.username);
		this.service.Login(this.loginForm.value.username, this.loginForm.value.password);
	}

}
