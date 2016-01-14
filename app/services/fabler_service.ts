import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';
/* tslint:disable:2362 */

@Injectable()
export class FablerService {
	api_http: string = '/* @echo API_HTTP */' || 'none';
	client: string = '/* @echo CLIENT_ID */' || 'none';
	public constructor(public http:Http) {

	}
	public Login(username:string, password:string) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		var client_id = '&client_id=' + '/* @echo CLIENT_ID */';
		this.http.post(this.api_http + 'o/token/', 'grant_type=password' + client_id + '&username=' + username + '&password=' + password, {
			headers: headers
		})
		.subscribe(
			data => {
				localStorage.setItem('token_expiration', String(new Date(Number(new Date()) - Number(-(new Date(data.json().expires_in * 1000))))));
				localStorage.setItem('username', username);
				localStorage.setItem('access_token', data.json().access_token);
				localStorage.setItem('refresh_token', data.json().refresh_token);
				localStorage.setItem('expires_in', data.json().expires_in);
				localStorage.setItem('loggedIn', 'true');
				location.reload();
			},
			err => console.log(err),
			() => console.log('Complete')
		);
	}
	public Logout() {
		localStorage.clear();
		location.reload();
	}
	public isAuth() {
		return localStorage.getItem('loggedIn');
	}
	public get_token() {
		if(this.isAuth()) {
			if(new Date < new Date(localStorage.getItem('token_expiration'))) {
				return localStorage.getItem('access_token');
			}
			if(new Date > new Date(localStorage.getItem('token_expiration'))) {
				var headers = new Headers();
				headers.append('Content-Type', 'application/x-www-form-urlencoded');
                headers.append('Accept', '*/*');
				this.http.post(this.api_http + 'o/token/', 'grant_type=refresh_token' + '&client_id=' +
					this.client + '&refresh_token=' + localStorage.getItem('refresh_token'), {
					headers: headers
				})
				.subscribe(
					data => {
						localStorage.setItem('token_expiration', String(new Date(Number(new Date()) - Number(-(new Date(data.json().expires_in * 1000))))));
						localStorage.setItem('access_token', data.json().access_token);
						localStorage.setItem('refresh_token', data.json().refresh_token);
						localStorage.setItem('expires_in', data.json().expires_in);
					},
					err => console.log(err),
					() => console.log('Complete')
				);
				return localStorage.getItem('access_token');
			}
		}
	}
	public get_username() {
		return localStorage.getItem('username');
	}
	public get_api() {
		return this.api_http;
	}
}

