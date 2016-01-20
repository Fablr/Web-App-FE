import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {FablerService} from '../../services/fabler_service';
import * as marked from 'marked';

@Component({
  selector: 'comment-form',
  template: `
	<section class="comment-form-content">
		<form [ngFormModel]="commentForm" (submit)="onSubmit()">
		<p>
            <textarea rows="1" cols="1" name="text" type="text" ngControl="comment" #rawMarkdown 
            (keyup)="convertMarkdown(rawMarkdown.value)"></textarea>
        </p>
        <p>
            <button type="submit">Submit</button>
        </p>
    	</form>
        <div *ngIf="username" class="preview" ><b>Preview (with Markdown)</b><br>
            <!--b>{{username}}</b--> 
            <div [innerHtml]="markdownHtml"></div>
        </div>
	</section>
  `,
  styleUrls: ['./components/app/comment_form.css'],
  directives: [FORM_DIRECTIVES]
})
export class CommentFormCmp {
    public markdownHtml: string = '';
    public username:string = '';

	commentForm: ControlGroup;
	@Input() id:number;
	@Input() object_type:string;
    @Input() parent:number;

    private md: MarkedStatic;

    constructor(fb: FormBuilder, public http:Http, public fablerService: FablerService) {
		this.commentForm = fb.group({
            comment: ['', Validators.required]
        });
        this.md = marked;
    }
    onSubmit() {
        if(this.parent) {
            var submit_comment = 'comment=' + this.commentForm.value.comment + '&parent=' + this.parent;
        } else {
            var submit_comment = 'comment=' + this.commentForm.value.comment;
        }
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
    convertMarkdown(val:string) {
        if(!val) { this.markdownHtml = ''; }
        this.markdownHtml = this.md.parse(val);
        this.username = localStorage.getItem('username');
    }
}
