import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
@Injectable()
export abstract class UnsubscribeClass implements OnDestroy {
    protected componentDestroyed$: Subject<void> = new Subject<void>();
    constructor() {
        console.log(this.componentDestroyed$);
        console.log("Common Unsubscribe class calling....[this.ngOnDestroy]")
        /// wrap the ngOnDestroy to be an Observable. and set free from calling super() on ngOnDestroy.
        let _$ = this.ngOnDestroy;
        this.ngOnDestroy = () => {
            this.componentDestroyed$.next();
            this.componentDestroyed$.complete();
            _$();
            // console.log("Common Unsubscribe class calling....[this.ngOnDestroy]")
        }
    }

    /// placeholder of ngOnDestroy. no need to do super() call of extended class.
    ngOnDestroy() {
        console.log(this.componentDestroyed$);
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
        console.log("Common Unsubscribe class calling....")
    }
}