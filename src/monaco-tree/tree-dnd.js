
class TreeDnD{

    /**
     * Get the uri of the dragged node
     * @param {Tree} tree monaco tree
     * @param {TreeNode} element tree node object
     */
    getDragURI(tree, element) {
        return element.key;
    }

    /**
     * Get the label of the dragged node
     * @param {Tree} tree monaco tree
     * @param {TreeNode} elements tree node object
     */
    getDragLabel(tree, elements) {
        return elements[0].name;
    }
    
    /**
     * On drag start event handler  
     * @param {Tree} tree moncao tree
     * @param {{}} data drag data
     * @param {Event} originalEvent original drag event
     */
    onDragStart(tree, data, originalEvent) {
        return;
    }
    
    /**
     * On drag over event handler. Determines if dragged node can be dropped ontop or not
     * @param {Tree} tree monaco tree
     * @param {{}} data drag data
     * @param {TreeNode} targetElement node being dragged over
     * @param {Event} originalEvent original drag event
     */
    onDragOver(tree, data, targetElement, originalEvent) {
        /**
         * @type {TreeNode}
         */
        let treeNode = data.elements[0];


        return {
            accept: targetElement.isDirectory && treeNode.parent !== targetElement && !targetElement.isDescendantOf(treeNode),
            autoExpand: true
          };

        // return null;
    }
    
    /**
     * Handler when tree node is dropped on a target
     * @param {Tree} tree monaco tree
     * @param {{}} data drag data
     * @param {TreeNode} targetElement node being dropped on
     * @param {Event} originalEvent original drag event
     */
    drop(tree, data, targetElement, originalEvent) {
       

        //first remove droppedNode  from immediate parent 
        /**
         * @type {TreeNode}
         */
        let droppedNode = data.elements[0];

        /**
         * @type {TreeNode}
         */
        let parent = droppedNode.parent;

        /**
         * @type {Array<TreeNode>}
         */
        let oldParentNewChildren = parent.children.filter( n => n != droppedNode);

        parent.children = oldParentNewChildren;


        //next add it as a child of the new parent
        targetElement.children.push( droppedNode);

        //sort the children
        targetElement.children.sort(function(a, b) {

            //directories have higher precedence
            if(a.isDirectory && !b.isDirectory) return -1;

            if(!a.isDirectory && b.isDirectory) return 1;

            let nameA = a.name.toLowerCase(); // ignore upper and lowercase
            let nameB = b.name.toLowerCase(); // ignore upper and lowercase
    
            if (nameA < nameB)  return -1;
    
            if (nameA > nameB) return 1;
          
            return 0;
        });

        //set targetElement as the new parent for droppedNode
        droppedNode.parent = targetElement;

        //finally refresh tree
        tree.model.refresh(parent);
        tree.model.refresh(targetElement);
        

        console.log(`moved ${data.elements[0].name} to ${targetElement.name}`);
        return;
    }
}

export { TreeDnD }