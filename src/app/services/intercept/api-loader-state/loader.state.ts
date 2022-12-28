import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { APILoaderAction } from "./loader.action";
import { I_API_LOADER } from "./loader.interface";

export class ApiLoaderModel {
    loaders: I_API_LOADER;
}

@State<ApiLoaderModel>({
    name: 'apiloaderstate',
    defaults: {
        loaders: {}
    }
})
@Injectable()
export class ApiLoaderState {

    // set loader
    @Action(APILoaderAction.START_LOADER)
    setLoader(ctx: StateContext<ApiLoaderModel>, { payload }: APILoaderAction.START_LOADER) {
        const state = ctx.getState();
        console.log("Get state", state)
        let index = Object.keys(state.loaders).indexOf(Object.keys(payload)[0]);
        if (index == -1) state.loaders[Object.keys(payload)[0]] = Object.values(payload)[0]
        else state.loaders[Object.keys(payload)[0]] = Object.values(payload)[0]

        console.log("Before fetch", payload, state.loaders, Object.keys(payload)[0])
        ctx.patchState({
            ...state,
            loaders: { ...state.loaders }
        })
    }
    // get loader
    @Selector()
    static getLoaderStatus(objKey: string) {
        return (state: ApiLoaderModel) => {
            console.log("after check :", objKey, state.loaders[objKey])
            return state.loaders[objKey] as boolean;
        }
    }
}