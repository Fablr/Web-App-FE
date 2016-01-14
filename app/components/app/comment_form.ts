import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {FablerService} from '../../services/fabler_service';

@Component({
  selector: 'comment-form',
  template: `
	<section class="comment-form-content">
		<form [ngFormModel]="commentForm" (submit)="onSubmit()">
		<p>
            <textarea rows="1" cols="1" name="text" type="text" ngControl="comment"></textarea>
        </p>
        <p>
            <button type="submit">Submit</button>
        </p>
    	</form>
	</section>
  `,
  styleUrls: ['./components/app/comment_form.css'],
  directives: [FORM_DIRECTIVES]
})
export class CommentFormCmp {
	commentForm: ControlGroup;
	@Input() id:number;
	@Input() object_type:string;
    constructor(fb: FormBuilder, public http:Http, public fablerService: FablerService) {
		this.commentForm = fb.group({
            comment: ['', Validators.required]
        });
    }
    onSubmit() {
        var submit_comment = 'comment=' + this.commentForm.value.comment;
		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.post(this.fablerService.get_api() + this.object_type + '/' + this.id + '/comments/', submit_comment, {
			headers: headers
			})
		.subscribe(
			data => console.log(data.json()),
			err => console.log(err),
			() => console.log()
		);
        console.log(this.commentForm.value.comment);
		console.log(this.id);
		console.log(this.object_type);
    }
}
