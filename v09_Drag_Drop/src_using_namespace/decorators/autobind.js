"use strict";
var App;
(function (App) {
    function autobind(_target, _nethodName, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    App.autobind = autobind;
})(App || (App = {}));
//# sourceMappingURL=autobind.js.map