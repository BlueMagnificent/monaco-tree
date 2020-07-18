MONACO TREE
-----------
A fairly successful attempt in extracting the tree view element hidden in [Monaco Editor](https://github.com/microsoft/monaco-editor) and making a [React](https://github.com/facebook/react) component of it.

It supports click events on tree nodes, context menu and also drag-n-drop ( you might want to open your browser console to see some logs).

![sample](img.png)


Credits to [WebAssemblyStudio](https://github.com/wasdk/WebAssemblyStudio) whose implementation approach was very helpful ( as well as some freely lifted codes :smiling_imp: ) 

CodeSandbox
--------------
For a quick preview [here is a codesandbox of it](https://codesandbox.io/s/github/BlueMagnificent/monaco-tree/)


Check It Out
--------------
Download the repository or clone it with git. Then

```
npm install
```
after which
```
 npm start
 ```
Next visit [localhost:7070](localhost:7070) on your browser.


Caveat
-------
* This project is more of an expriment to extract out and use the tree component in Monaco Editor. It is, for now, a Proof-Of-Concept.

* Second. [Monaco Editor](https://github.com/microsoft/monaco-editor) is "the code editor that powers" [vscode](https://github.com/microsoft/vscode), however it contains a tree component. 

    Despite the fact that this project is mainly based on the tree component, I honestly have no idea why it was bundled together with Monaco.

    Unfortunately, internal APIs have been changing between versions of Monaco and I can't guarantee that the tree conponent will always behave the same.

    To that end, the version of Monaco used in this project (0.20.0) is the version I can clearly confirm makes this project work as expected.


License
--------

Monaco Tree is MIT Licensed