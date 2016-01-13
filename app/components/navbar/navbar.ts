import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Login} from '../app/login';
import {FablerService} from '../../services/fabler_service';

// ????? let html = require('!!prismjs?lang=markup!./dropdown/dropdown-demo.html');
@Component({
	selector: 'navbar',
	template: `
		 <!-- Static navbar -->
			<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Fabler</a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a [routerLink]="['/Home']">Home</a></li>
				</ul>
				
				<div *ngIf="!username">				
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown" dropdown (onToggle)="toggled($event)" autoClose="disabled">
						<a href="#" role="button" aria-expanded="false" id="simple-dropdown" dropdown-toggle>{{login_text}}<span class="caret"></span></a>	
						<ul class="dropdown-menu" role="menu" aria-labelledby="simple-dropdown">
							<li role="menuitem"><login></login></li>
						</ul>
					</li>
				</ul>
				</div>
				
				<div *ngIf="username">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown" dropdown (onToggle)="toggled($event)" autoClose="disabled">
						<a href="#" role="button" aria-expanded="false" id="simple-dropdown" dropdown-toggle>{{login_text}}<span class="caret"></span></a>	
						<ul class="dropdown-menu" role="menu" aria-labelledby="simple-dropdown">
							<li><a href="#" (click)="logout()">Logout</a></li>
						</ul>
					</li>
				</ul>
				</div>

				</div><!--/.nav-collapse -->
			</div>
			</nav>
		`,
	directives: [RouterLink, DROPDOWN_DIRECTIVES, Login]
})

@Component({
	selector: 'navbar'
})
export class NavCmp {
	login_text:string = 'Login';
	username:string = localStorage.getItem('username');
	constructor(public fablerService: FablerService) {
		this.login_text = 'Login';
		if(localStorage.getItem('username') !== null) {
			this.login_text = localStorage.getItem('username');
		}
	}

	toggled(open:boolean):void {
    	//$event.preventDefault();
		//console.log('Dropdown is now: ', open);
  	}
	logout() {
		this.fablerService.Logout();
	}
}
