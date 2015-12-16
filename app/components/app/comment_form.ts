import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
@Component({
  selector: 'comment-form',
  templateUrl: './components/app/comment_form.html',
  styleUrls: ['./components/app/comment_form.css'],
  directives: [FORM_DIRECTIVES]
})
export class CommentFormCmp {
	form: ControlGroup;
    comment: Control = new Control('', Validators.required);
	@Input() id:number;
	@Input() object_type:string;
    constructor(fb: FormBuilder, public http:Http) {
        this.form = fb.group({
            'comment': this.comment
        });
    }
    onSubmit() {
        var submit_comment = 'comment=' + this.form.controls.comment.value;
		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.post('http://api.test.com:8000/' + this.object_type + '/' + this.id + '/comments/', submit_comment, {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			data => console.log(data),
			err => console.log(err),
			() => console.log()
		);
        console.log(this.form.controls.comment.value);
		console.log(this.id);
		console.log(this.object_type);
    }
}
