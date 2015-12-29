import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class FablerService {
	public constructor(public http:Http) {
		var headers = new Headers();
	}
	public Login(username:string, password:string) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		var client_id = '&client_id=KXDeDW05zIJ01mFCOCxw5jAuf5juOWmJgNvvy24B';
		this.http.post(System.http_api + '/o/token/', 'grant_type=password' + client_id + '&username=' + username + '&password=' + password {
			headers: headers
		})
		.subscribe(
			data => {
				localStorage.setItem('username', username);
				localStorage.setItem('access_token', data.json().access_token);
				localStorage.setItem('refresh_token', data.json().refresh_token);
				localStorage.setItem('expires_in', data.json().expires_in);
				localStorage.setItem('loggedIn', true);
				location.reload();
			},
			err => console.log(err),
			() => console.log("Complete")			
		);
	}
	public Logout() {
		localStorage.clear(); 
		location.reload();
	}
	public APICall(url:string) {
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get(System.http_api + url {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			data => return data.json(),
			err => console.log(err),
			() => console.log()
		);		
	}
	public isAuth() {
		return localStorage.getItem('loggedIn')
	}
}

