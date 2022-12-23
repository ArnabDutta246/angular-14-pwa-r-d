import { Injectable, InjectionToken, Injector } from "@angular/core";

export const COMPONENT_ONE_TOKEN = new InjectionToken<any>('');
export const COMPONENT_TWO_TOKEN = new InjectionToken<any>('');
export const COMPONENT_THREE_TOKEN = new InjectionToken<any>('');
@Injectable({
    providedIn: 'root'
})
export class InjectorShareService {
    constructor(
        private injector: Injector
    ) { }

    /**
     * Send Injector From Parents
     * @param tokenName 
     * @param sharedData 
     * @returns 
     */
    public sendInjector(tokenName: InjectionToken<any>, sharedData: any): Injector {
        let injector = Injector.create({
            providers: [{ provide: tokenName, useValue: sharedData }],
            parent: this.injector,
        });
        return injector;
    }
    public receiveToken(tokenName: InjectionToken<any>) {
        return this.injector.get(tokenName);
    }

}