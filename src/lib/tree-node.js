
/**
 * Tree Node class
 *
 * @class TreeNode
 */
class TreeNode {
    /**
     * Creates an instance of TreeNode.
     * @param {string} key  Unique key identifier for this file
     * @param {string} name Name of file
     * @param {boolean} isDirectory True if node is a directory otherwise node is a file
     * @param {TreeNode} parent parent tree node
     * 
     * @memberof TreeNode
     */
    constructor(key, name, isDirectory, parent){
        this.key = key;
        this.name = name;
        this.isDirectory = isDirectory;
        this.children = [];
        this.parent = parent;
    }

    get path(){
        
        //if this is the rootnode (this.parent == null) then just return empty string
        //we don't need the rootnode's name appearing in the path of its children
        if( this.parent == null ) return "";

        const parentPath = this.parent.path;

        return parentPath === "" ? this.name : parentPath + "/" + this.name;
    }

    isDescendantOf(treeNode) {
        let parent = this.parent;
        while (parent) {
          if (parent === treeNode) {
            return true;
          }
          parent = parent.parent;
        }
        return false;
    }
}


export { TreeNode }