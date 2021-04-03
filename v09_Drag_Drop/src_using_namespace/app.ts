// Importing just means we tell TS where to find that type. Once it is compiled to JS this connection is basically destroyed. So in JS
// when it executes and when we try to create new project by instantiating Project, JS doesn't find this project class or a constructor
// function so we have to make sure we carry over this connection. To achieve this, uncomment the 'outfile' option in tsconfig.json.
// Idea behind it is to tell TS that it should concatenate namespaces so below references (imports) it has during compilation into one
// single JS file ('bundle.js' inside 'dist' folder) instead of compiling multiple JS file.
/// <reference path = "models/drag-drop.ts"/>
/// <reference path = "models/project.ts"/>
/// <reference path = "state/project-state.ts"/>
/// <reference path = "util/validation.ts"/>
/// <reference path = "decorators/autobind.ts"/>

/// <reference path = "components/project-input.ts"/>
/// <reference path = "components/project-list.ts"/>

namespace App 
{
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}