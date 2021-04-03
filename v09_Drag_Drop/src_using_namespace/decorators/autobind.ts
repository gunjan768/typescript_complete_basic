namespace App {
    // Autobind decorator
    // Bounded to submitHandler() method of class ProjectInput. This decorator is used to overcome the problem of 'this' keyword.
    export function autobind(_target: any, _nethodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };

        return adjDescriptor;
    }
}