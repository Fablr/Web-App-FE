import {Component, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, Input} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
@Component({
  selector: 'comment-form',
  templateUrl: './components/app/comment_form.html',
  styleUrls: ['./components/app/comment_form.css'],
  directives: [FORM_DIRECTIVES]
})
export class CommentFormCmp {
	form: ControlGroup;
    comment: Control = new Control("", Validators.required);
	@Input() id:int;
	@Input() objectType;
    constructor(fb: FormBuilder) {
        this.form = fb.group({
            "comment": this.comment,
        });
    }
    onSubmit() {
        console.log("model-based form submitted");
        console.log(this.form.controls.comment.value);
		console.log(this.id);
		console.log(this.objectType);
    }	
}
