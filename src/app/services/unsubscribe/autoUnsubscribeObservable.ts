import { Unsubscribable } from "rxjs";
import 'reflect-metadata';

export interface I_UnsubscribableLike {
    subscriptions: Unsubscribable[],
    unsubscribe: () => void
}
export function DestroySubscribers(params?) {

    // Callback to get the target of class
    // --------------------------
    return function (target) {
        params = {
            destroyFunc: 'ngOnDestroy',
            ...params
        };
        // Init Unsubscribable Subscribers list
        // --------------------------
        const unsubscribableLike: I_UnsubscribableLike = {
            subscriptions: [],
            unsubscribe: null,
        };

        const subscriber: string = Reflect.getMetadata('subscription:name', target.prototype, 'subscriber');

        Object.defineProperty(target.prototype, subscriber ? subscriber : 'subscriber', {
            get: () => unsubscribableLike,
            set: subscription => unsubscribableLike.subscriptions.push(subscription),
        });

        // console.log("target.prototype", target.prototype);
        // console.log("subscriber", subscriber);
        // console.log("unsubscribableLike", unsubscribableLike);

        if (typeof target.prototype[params.destroyFunc] !== 'function') {
            throw new Error(`${target.prototype.constructor.name} must implement ${params.destroyFunc}() lifecycle hook`);
        }

        // Target class on 'ngOnDestroy' hook call function
        // ----------------------------------------------------
        target.prototype[params.destroyFunc] = ngOnDestroyDecorator(target.prototype[params.destroyFunc]);

        function ngOnDestroyDecorator(f) {
            return function () {
                unsubscribe();
                return f.apply(this, arguments);
            };
        }

        function unsubscribe() {
            do {
                const sub: Unsubscribable = unsubscribableLike.subscriptions.shift();
                console.log("[Unsubscriber data] :", sub)
                if (sub && typeof sub.unsubscribe === 'function') { sub.unsubscribe(); }
            } while (unsubscribableLike.subscriptions.length);
        }
        // Return the same target
        // --------------------------
        return target;
    }
}
export function CombineSubscriptions(params?) {
    return function (target, propertyKey: string | symbol) {
        Reflect.defineMetadata('subscription:name', propertyKey, target, 'subscriber');
    };
}
/**
 * What is Reflect?Reflect.getMetadata?
 */