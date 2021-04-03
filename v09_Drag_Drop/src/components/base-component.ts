// Component Base Class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;     // div element wiht id = 'app' (see index.html file)
    element: U;

    // Optional parameter(s) should always come last i.e. no required parameter comes after optional parameter.
    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {

        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        
        // When we create new instance of this class, we immediately want to render a form that belongs to this instance, so we do will
        // it in the constructor. importNode() is a method provided on gloabal document object and to import node you pass a pointer at
        // your template element. Second argument passed is 'true' which means we want a deep clone.
        const importedNode = document.importNode(this.templateElement.content, true);

        // There is no separate HTML Section element type so we used HTMLElement type.
        this.element = importedNode.firstElementChild as U;   // section element
        
        if(newElementId)
        this.element.id = newElementId;

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {

        // The insertAdjacentElement() method inserts a the specified element into a specified position. Legal position values are:
        // "afterbegin" : After the beginning of the element (as the first child), "afterend" : After the element, 
        // "beforebegin" : Before the element, "beforeend" : Before the end of the element (as the last child)
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}