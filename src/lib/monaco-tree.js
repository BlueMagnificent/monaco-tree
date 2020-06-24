import React from "react";
import { createController } from "./monaco-controller";
import { Tree } from "./monaco-utils";


class MonacoTree extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = { directory: this.props.directory };
        
    }

      
    componentDidMount() {
        this.ensureTree();
        this.tree.model.setInput(this.props.directory);
        this.tree.model.onDidSelect((e) => {
          if (e.selection.length) {
            this.props.onClickFile(e.selection[0]);
          }
        });
        document.addEventListener("layout", this.onLayout);
      }

      componentWillUnmount() {
        document.removeEventListener("layout", this.onLayout);
      }


      componentWillReceiveProps(props) {

        if (this.state.directory !== props.directory) {
            this.tree.model.setInput(props.directory);
            this.setState({ directory: props.directory });

        } else {
          this.tree.refresh();
          expandTree(this.tree);

        }

      }


      setContainer(container) {
        if (container == null) { return; }
        this.container = container;

      }

      ensureTree() {
        if (this.container.lastChild) {
          this.container.removeChild(this.container.lastChild);
        }

        const { treeConfig, getActions } = this.props;

        treeConfig.controller = createController(this, getActions, true),
    
        this.tree = new Tree(this.container, treeConfig );
      }

      
      expandTree(tree){

        const model = tree.model;
        const elements = [];

        let item;
        const nav = model.getNavigator();

        while (item = nav.next()) {
            elements.push(item);
        }

        for (let i = 0, len = elements.length; i < len; i++) {
            model.expand(elements[i]);
        }
    
     }

      
      onLayout(){
        this.tree.layout();
      }


      render() {
        return (
            <div className="fill" ref={(ref) => this.setContainer(ref)}>
            </div>
        )
      }
}


export { MonacoTree }