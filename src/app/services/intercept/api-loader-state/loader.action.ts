import { I_API_LOADER } from "./loader.interface";

export namespace APILoaderAction {
    export class START_LOADER {
        static readonly type = '[API LOADER] Start';
        constructor(public payload: I_API_LOADER) { }
    }
    export class STOP_LOADER {
        static readonly type = '[API LOADER] Stop';
        constructor(public payload: I_API_LOADER) { }
    }
}