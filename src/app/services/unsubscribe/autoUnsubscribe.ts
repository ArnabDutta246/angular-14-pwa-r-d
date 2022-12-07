export function AutoUnsub() {
    return function (constructor) {
        const orig = constructor.prototype.ngOnDestroy
        constructor.prototype.ngOnDestroy = function () {
            for (const prop in this) {
                const property = this[prop];
                console.log("getting class data: ", property);


                if (property && typeof property.subscribe === "function") {
                    console.log("Unsubscribe Data: ", property);
                    property.unsubscribe()
                }
            }
            orig.apply()
        }
    }
}