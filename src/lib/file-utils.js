
export function getFileIconLabel(fileName, isDirectory = false){

    // File extension of interest are: html, htm, js, css, json, gif, jpg, jpeg, png, ico, md, txt
    // You can add more as you see fit
    fileName = fileName.toLowerCase();
    const ext = fileName.split(".").pop();

    // Handle folders first
    if( isDirectory ){

        switch(fileName){
            case 'public':
                return 'folder_type_public';

            case 'css':
                return 'folder_type_css';

            case 'js':
                return 'folder_type_js';

            case 'img':
                return 'folder_type_images';
    
            case 'models':
                return 'folder_type_model';
                
            case 'views':
                return 'folder_type_view';

            case 'controllers':
                return 'folder_type_controller';

            case 'templates':
                return 'folder_type_template';

            default:
                return "folder-icon";
        }
    }

    //handle special case files
    switch( fileName){
        case 'favicon.ico':
            return 'file_type_favicon';

        case 'package.json':
            return 'file_type_npm';

        case 'license':
        case 'license.txt':
            return 'file_type_license';
    }
    

    //Lastly handle file extensions
    switch(ext){
        case 'html':
        case 'htm':
            return 'file_type_html';

        case 'js':
            return 'file_type_js';

        case 'css':
                return 'file_type_css';

        case 'json':
            return 'file_type_json';

        case 'gif':
        case 'jpg':
        case 'jpeg':
        case 'png':
            return 'file_type_image';

        case 'md':
            return 'file_type_markdown';

        case 'txt':
        default:
            return 'file_type_text';
    }
  
}