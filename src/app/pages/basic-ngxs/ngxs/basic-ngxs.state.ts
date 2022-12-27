import { I_Post } from "./post.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { Injectable } from "@angular/core";
import { PostsAction } from "./basic-ngxs.action";
import { PostService } from "./basic-ngrx.service";
import { tap } from "rxjs/operators";
export class PostStateModel {
    posts: I_Post[];
}
@State<PostStateModel>({
    name: 'poststate',
    defaults: {
        posts: []
    }
})
@Injectable()
export class PostState {
    constructor(private postServ: PostService) {

    }
    @Selector()
    static getPosts(state: PostStateModel): I_Post[] {
        return state.posts;
    }


    // @Action(PostsAction.AddPost)
    // get({ getState, patchState }: StateContext<PostStateModel>, { payload }: PostsAction.AddPost): any {
    //     const state = getState();
    //     patchState({
    //         posts: [...state.posts, payload]
    //     });
    // }

    // @Action(TutorialAction.RemoveTutorial)
    // remove({ getState, patchState }: StateContext<TutorialStateModel>, { payload }: TutorialAction.RemoveTutorial): any {
    //     patchState({
    //         tutorial: getState().tutorial.filter(tutorial => tutorial.name !== payload)
    //     });
    // }

    @Action(PostsAction.GetPosts)
    getDataFromState(ctx: StateContext<PostStateModel>) {
        return this.postServ.fetchPost().pipe(
            tap((returnData: I_Post[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    posts: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
                })
            }))
    }

    @Action(PostsAction.AddPost)
    addDataToState(ctx: StateContext<PostStateModel>, { payload }: PostsAction.AddPost) {
        return this.postServ.addPost(payload).pipe(tap(returnData => {
            const state = ctx.getState();
            ctx.patchState({
                posts: [...state.posts, payload]
            })
        }))
    }

    @Action(PostsAction.UpdatePost)
    updateDataOfState(ctx: StateContext<PostStateModel>, { payload, id, i }: PostsAction.UpdatePost) {
        return this.postServ.updatePost(payload, i).pipe(tap(returnData => {
            const state = ctx.getState();

            const postList = [...state.posts];
            postList[i] = payload;

            ctx.setState({
                ...state,
                posts: postList,
            });
        }))
    }

    @Action(PostsAction.DeletePost)
    deleteDataFromState(ctx: StateContext<PostStateModel>, { id }: PostsAction.DeletePost) {
        return this.postServ.deletePost(id).pipe(tap(returnData => {
            const state = ctx.getState();
            console.log("The is is", id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.posts.filter(contents => contents.id !== id);

            ctx.setState({
                ...state,
                posts: filteredArray
            })
        }))
    }
}
