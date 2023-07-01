import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state"
import { placeholder } from '@codemirror/view';
import './style.scss';
import { editorContent } from "./lib/config";

export class Editor {
    private editor: HTMLElement = document.createElement('div');

    private cssEditor: EditorView;

    private htmlViewer: EditorView;

    constructor() {
        this.editor.className = 'flex w-[90%] justify-center m-auto editor-container';

        const cssContainer: HTMLDivElement = document.createElement('div');
        cssContainer.classList.add('css-editor', 'w-[50%]');

        const htmlContainer: HTMLDivElement = document.createElement('div');
        htmlContainer.classList.add('html-viewer', 'w-[50%]');

        this.editor.append(cssContainer, htmlContainer);

        this.cssEditor = new EditorView({
            doc: '',
            extensions: [placeholder(editorContent), basicSetup],
            parent: cssContainer,
        });

        this.htmlViewer = new EditorView({
            doc: '',
            extensions: [basicSetup],
            parent: htmlContainer,
        });
    }

    public getContainer(): HTMLElement {
        return this.editor;
    }

    public setHtmlViewer(text: string): void {
        this.htmlViewer.setState(EditorState.create({ doc: text }))
    }
}