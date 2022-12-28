import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { I_API_LOADER } from "./loader.interface";

@Injectable({
    providedIn: 'root'
})
export class LoaderInjectService {
    public loaderSub$ = new BehaviorSubject<I_API_LOADER>({});
    constructor() { }

    // set
    setLoaderState(data: I_API_LOADER) {
        const state = this.loaderSub$.getValue();
        console.log("Get state", state)
        let index = Object.keys(state).indexOf(Object.keys(data)[0]);
        if (index == -1) state[Object.keys(data)[0]] = Object.values(data)[0]
        else state[Object.keys(data)[0]] = Object.values(data)[0];
        return this.loaderSub$.next({ ...state, ...data })
    }
    // get
    getLoaderState(key) {
        return this.loaderSub$.pipe(
            map(x => x[key])
        )
    }
}