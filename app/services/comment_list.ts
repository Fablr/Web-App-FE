export class CommentList {
  comments: string[];
  get(): string[] {
    return this.comments;
  }
  add(value: string): void {
    this.comments.push(value);
  }
}
