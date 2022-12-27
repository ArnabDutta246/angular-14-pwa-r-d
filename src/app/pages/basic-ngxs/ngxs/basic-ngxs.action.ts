export namespace PostsAction {
    //Read
    export class GetPosts {
        static readonly type = '[POST] Fetch';
    }
    //Create
    export class AddPost {
        static readonly type = '[POST] Add';
        constructor(public payload: any) { }
    }
    //Update
    export class UpdatePost {
        static readonly type = '[POST] Update';
        constructor(public payload: any, public id: number, public i: number) { }
    }
    //Delete
    export class DeletePost {
        static readonly type = '[POST] Delete';
        constructor(public payload: any, public id: number) { }
    }
}