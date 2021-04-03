import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import Component from './base-component';
import { autobind } from '../decorators/autobind';

// ProjectItem class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{

    private project: Project;
    
    get persons() {
        if(this.project.people == 1) {
            return '1 person';
        }

        return `${this.project.people} persons`;
    }
    
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);      // this.element = <li> tag (see index.html page)
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;     // this.element = <li> tag (see index.html page)
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent) {
        
        // 'dataTransfer' property available with drag event. On this property we attach data to the drag event and later we can extract
        // that data upon a drop and the browser and JS behind the scenes will store the data during the drap operation and ensure that
        // the data you get when the drop happens is the same data you attached.

        // 'dataTransfer' property can also be null because drag event is always the same kind of event but based on which listener
        // triggers it or which exact event you are listening to. So not drag related events give you an event object that has the
        // 'dataTransfer' property. Arguments passed to setData() method : which type of data is being transferred (here we are 
        // attaching the id of the projet instead of whole project object so 'text/plain'), corresponding data to first aregument.

        // console.log("dragStartHandler : ", this);

        event.dataTransfer!.setData('text/plain', this.project.id);
        
        // Will change the UI like cursor while you drag and drop
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
        // console.log("dragEndHandler");
    }
}