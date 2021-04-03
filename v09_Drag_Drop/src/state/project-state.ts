import { Project, ProjectStatus } from '../models/project';

// For all addListeners
type Listener<T> = (items: T[]) => void;

class State<T> {

    // We want the access modifier (specifier) of 'listener' to be 'protected' as we want it not to be accessed from outside the this
    // clas but can be accessed from any inherting class like we are doing here (accessing it from 'ProjectState' class).
    protected listeners: Listener<T>[] = [];
    
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// Project State Management
export class ProjectState extends State<Project> {
    
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.ACTIVE);

        this.projects.push(newProject);

        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === projectId);
        
        if(project && project.status !== newStatus) {
            project.status = newStatus;
            
            this.updateListeners();
        }
    }

    private updateListeners() {
        // Looping over Active and Finished projects type
        for(const listenerFn of this.listeners) {

            // this.projects.slice() : To return the copy of the array and not the original array.
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();
