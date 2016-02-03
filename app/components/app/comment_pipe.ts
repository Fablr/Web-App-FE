import { Pipe } from 'angular2/core';

@Pipe({
    name: 'comment_sort'
})
export class CommentSortPipe {
    child: Array<Object> = [];
    parent: Array<Object> = [];
    finalArray: Array<Object> = [];
    transform(array: Array<Object>, args: string): Array<Object> {
        if (typeof array === 'undefined') {
            return array;
        }
        if (typeof args[0] === 'undefined') {
            return array;
        }
        for (var obj of array) {
            (obj as any).parent ? this.child.push(obj) : this.parent.push(obj);
        }
        this.parent.sort((a: any, b: any) => {
            let left    = Number(new Date(a.submit_date));
            let right   = Number(new Date(b.submit_date));
            return right - left;
        });
        this.child.sort((a: any, b: any) => {
            let left    = Number(new Date(a.submit_date));
            let right   = Number(new Date(b.submit_date));
            return left - right;
        });
        for (var parent_obj of this.parent) {
            this.finalArray.push(parent_obj);
            for (var child_obj of this.child) {
                if((child_obj as any).parent === (parent_obj as any).id) {
                    this.finalArray.push(child_obj);
                }
            }
        }

        return this.finalArray;
    }
}
