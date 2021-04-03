import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import Component from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

// ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    
    // assignedProjects is specific to ProjectList class.
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {

        super('project-list', 'app', false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }
    
    // Method overriding of abstract method renderContent()
    renderContent() {

        // Adding ID to the UL element according to active or finished project type.
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;      // this.element = <section> tag (see index.html page)
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    // Method overriding of abstract method configure()
    configure() {
        
        // Adding listeners for each project type (Active and Finished)
        projectState.addListener((projects: Project[]) => {
            
            const relevantProjects = projects.filter(proj => {

                // If currently looping over Active Project List : It will indeed contains only active projects.
                if(this.type === 'active') {
                    return proj.status === ProjectStatus.ACTIVE;
                }
                
                return proj.status === ProjectStatus.FINISHED;
            });

            // Overwriting the old with the new filtered projects.
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });

        this.element.addEventListener('dragover', this.dragOverHandler);    // this.element = <section> tag (see index.html page)
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    } 

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        listEl.innerHTML = '';

        for(const projectItem of this.assignedProjects) {

            // const listItem = document.createElement('li');
            // listItem.textContent = projectItem.title;

            // listEl?.appendChild(listItem);
            
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);     // this.element = <section> tag (see index.html page)
        }
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        
        // Will be called when you are dragging (after pick and before drop). It will be called multiple times.
        // console.log("dragOverHandler");

        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            
            // event.preventDefault() : we need to call because in JS drag and drop works such that a drop is actually only allowed. So
            // the drop event will only triggered on an element if in the dragOverHandler() on that same element you called preventDefault()
            // You can think of this as the following the default for JS drag and drop events is to no allow dropping. So you have prevent
            // default in the dragOverHandler() to tell JS in the browser that for this element (here for ProjectList) you wanna allow drop.
            // So noly if you prevent default in dragOverHandler() then 'drop' event will actually trigger.
            event.preventDefault();

            const listEl = this.element.querySelector('ul');
            listEl?.classList.add("droppable");
        }
    }
    
    @autobind
    dropHandler(event: DragEvent) {

        // console.log("dropHandler");

        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {

        // Will be called when you leave the area
        // console.log("dragLeaveHandler");

        const listEl = this.element.querySelector('ul');

        listEl?.classList.remove("droppable");
    }
}