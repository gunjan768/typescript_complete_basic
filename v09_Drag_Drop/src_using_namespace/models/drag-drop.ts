namespace App {
    // Drag and Drop interfaces
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {

        // To signal the browsers and JS that the thing we are dragging is a valid drag target. If you don't do the right thing in
        // the dragOverHandler() dropping will not be possible.
        dragOverHandler(event: DragEvent): void;

        // We need the dropHandler() to react to the actual drop that happens. So dragOverHandler() will permit the drop with the dropHandler()
        // will handle the drop. Here we can update the UI and data. 
        dropHandler(event: DragEvent): void;

        // It is useful if we are giving some visual feedback to the user when something is dropped over the box for example changing the 
        // background color. Well if no drop happens and instead it's cancelled or the user removes the element away we can use the
        // dragLeaveHandler() to revert our visual update.
        dragLeaveHandler(event: DragEvent): void;
    }
}