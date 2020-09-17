import { TreeNode } from "./tree-node";



/**
 * Generate the directory tree objects based on the passed directory file entries
 *
 * @param {Array<String>} [entries=[]]
 * @param {String} [root="Root"]
 * @returns {}
 */
export function generateDirectoryTree(entries = [], root = "root"){


    //first sort the entries alphabetically
    entries.sort(function(a, b) {
        a = a.toLowerCase(); // ignore upper and lowercase
        b = b.toLowerCase(); // ignore upper and lowercase

        if (a < b)  return -1;

        if (a > b) return 1;
      
        return 0;
    });


    let currentKey = 1;

    const rootNode = new TreeNode( `${currentKey}`, root, true,  null );


    //create the folders
    entries.forEach(pathStr => {

        const pathArr = pathStr.split('/');
        
        const pathLen = pathArr.length;
        
        let current = rootNode;  

        for(let i = 0; i < pathLen; i++){
            let name = pathArr[i];

            let index = i;
            
            // If the child node doesn't exist, create it
            let child = current.children.find(el => el.name === name);

            if(child === undefined && index < ( pathLen - 1) ){
                
                currentKey = currentKey += 1;
                child = new TreeNode( `${currentKey}`, name, true,  current );
                    
                current.children.push(child);
                
            }
    
            // make child the current tree node
            current = child;
        }
    
    
    });




    //create the files
    entries.forEach(pathStr => {
    
        const pathArr = pathStr.split('/');
        
        const pathLen = pathArr.length;
        
        let current = rootNode; 
    
        if(pathLen === 1){

            let name = pathArr[0];

            currentKey = currentKey += 1;

            let node = new TreeNode( `${currentKey}`, name, false,  current );

            current.children.push(node);
            
            return;
        }  
    
        
        // Loop through the path to add files
        pathArr.forEach( (name, index) => {
    
            // If the child node doesn't exist, create it
            let child = current.children.find(el => el.name === name);

            
            if(child === undefined && index === ( pathLen - 1)){

                currentKey = currentKey += 1;

                child = new TreeNode( `${currentKey}`, name, false,  current );

                current.children.push(child);
                
            }
            else if( child === undefined ){
                return;
            }
            else
            {
                // make child the current tree node
                current = child;

            }

        });
    
    });

    return rootNode;
    
}

