// import { Action, createReducer, on } from "@ngrx/store";
// import { initiLoaderState, I_Loader } from "./loader.state";
// import * as LoaderActions from "./loader.actions";

// export const loaderReducer = createReducer(initiLoaderState,
//     on(LoaderActions.getLoaderAction, (state, actions) => {
//         return { ...state }
//     }),
//     on(LoaderActions.updateLoaderAction, (state, actions) => {
//         return { ...state, loaderTxt: actions.loaderTxt ? actions.loaderTxt : '', showHideState: !state.showHideState }
//     })
// )
// export function LoaderReducer(state: I_Loader, action: Action) {
//     return loaderReducer(state, action);
// }