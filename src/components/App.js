import React from 'react';
import { MonacoTree } from '../lib/monaco-tree';
import { TreeDnD } from '../lib/tree-dnd';
import { generateDirectoryTree } from  '../lib/tree-generator';
import { FileTemplate } from "../lib/template";
import { directoryListing } from "../lib/directory-listing";
import { Action, Separator } from "../lib/monaco-utils";


const rootDirectoryName = "demo";

export default class AppView extends React.Component{
    constructor(props){
        super(props);
        this.rootDirectoryName = "demo";

        this.state = {
                        rootNode: null,
                        treeConfig: null
                    };
    }

    componentDidMount(){

        const treeConfig = {
            dataSource: {
              /**
               * Returns the unique identifier of the given element.
               * No more than one element may use a given identifier.
               */
              getId: function(tree, element){
                return element.key;
              },
      
              /**
               * Returns a boolean value indicating whether the element has children.
               */
              hasChildren: function(tree, element){
                return element.isDirectory;
              },
      
              /**
               * Returns the element's children as an array in a promise.
               */
              getChildren: function(tree, element){
                return Promise.resolve(element.children);
              },
      
              /**
               * Returns the element's parent in a promise.
               */
              getParent: function(tree, element){
                  return Promise.resolve(element.parent);
                },
            },
            renderer: {
              getHeight: function(tree, element){
                return 24;
              },
              renderTemplate: function(tree, templateId, container) {
                return new FileTemplate(container);
              },
              renderElement: function(tree, element, templateId, templateData) {
                  templateData.set(element);
              },
              disposeTemplate: function(tree, templateId, templateData) {
                  FileTemplate.dispose();
              }
            },

            //tree config requires a controller property but we would defer its initialisation
            //to be done by the MonacoTree component
            //controller: createController(this, this.getActions.bind(this), true),
            dnd: new TreeDnD()
        };


        this.setState({
            rootNode: generateDirectoryTree(directoryListing, rootDirectoryName),
            treeConfig: treeConfig
        });

    }

    /**
     * Get Action
     */
    getActions(file, event) {
        const actions = [];

        // Directory options
        if (file.isDirectory) {

            actions.push(new Action("1", "New File", "", true, () => {
                console.log("action New File on " + file.name);

            }));

            //menu separator
            actions.push(new Separator());

            actions.push(new Action("2", "New Directory", "", true, () => {
                console.log("action New Directory on " + file.name);

            }));

            actions.push(new Action("3", "Upload Files", "", true, () => {
                console.log("action Upload Files on " + file.name);
                
            }));
            
        }
        
            
        actions.push(new Action("4", "Download", "", true, () => {
            console.log("action Download on " + file.name);
        }));
        
        actions.push(new Action("5", "Delete", "", true, () => {
            console.log("action Delete on " + file.name);
            
        }));


        return actions;
    }

    onClickFile(file) {
        if (file.isDirectory) {
            return;
        }

        if (Date.now() - this.lastClickedTime < 500 && this.lastClickedFile === file) {
            this.onDoubleClickFile(file);
        } 
        else {
            console.log(file.name + " clicked");
        }

        this.lastClickedTime = Date.now();
        this.lastClickedFile = file;

    }

    onDoubleClickFile(file){
        console.log(file.name + " double clicked");
    }

    render(){

        return(
            <div className="vs-dark show-file-icons show-folder-icons" style={{width: "300px", height: "600px", position: "relative", margin: "0px auto"}}>

                <div className="workspaceContainer">
                    {
                        !this.state.rootNode
                        ? 
                        null
                        :
                        (
                            <MonacoTree 

                                directory={this.state.rootNode}

                                treeConfig={this.state.treeConfig}

                                getActions={this.getActions.bind(this)}

                                onClickFile={ this.onClickFile.bind(this)}


                            />
                        )
                    }
                </div>
            </div>
        )
    }
} 