import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state"
import './style.scss';
import { getElement } from "@shared/helpers/getElement";
import { checkAnswer } from "@features/levels";
import { editorPlaceholder } from "./lib/config";

export class Editor {
    private editor: HTMLElement = document.createElement('div');

    private htmlViewer: EditorView;

    constructor() {
        this.editor.className = 'flex flex-col xl:w-[50%] w-[70%] items-center justify-start m-auto editor-container rounded-xl';

        const cssContainer: HTMLDivElement = document.createElement('div');
        cssContainer.className = 'flex flex-col w-full bg-zinc-700 css-editor rounded-xl';

        const htmlContainer: HTMLDivElement = document.createElement('div');
        htmlContainer.className = 'w-full m-2 bg-zinc-700 html-viewer rounded-xl';

        cssContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">CSS Editor</span></div>
        <div class="flex rounded-b-xl">
            <span class="w-[30px] bg-teal-200 text-center text-gray-600 leading-8 border-r rounded-bl-xl text-[13px]">1</span>
            <input type="text" class="user-css-input px-2 py-1 focus:outline-none grow" placeholder="${editorPlaceholder}"/>
            <button class="check-answer w-[55px] text-center bg-teal-500 text-gray-600 rounded-br-xl hover:bg-teal-300 transition duration-150 ease-out hover:ease-in">Enter</button>
        </div>`;

        const checkAnswerButton = getElement<HTMLButtonElement>(cssContainer, '.check-answer');
        const userAnswerInput = getElement<HTMLInputElement>(cssContainer, '.user-css-input');
        checkAnswerButton.addEventListener('click', () => checkAnswer(userAnswerInput.value));

        htmlContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">HTML Preview</span></div>`;

        this.editor.append(cssContainer, htmlContainer);

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
        this.htmlViewer.setState(EditorState.create({ doc: text, extensions: [basicSetup] }))
    }
}