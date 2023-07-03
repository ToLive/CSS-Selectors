import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state"
import './style.scss';
import { getElement } from "@shared/helpers/getElement";
import { checkAnswer } from "@features/levels";
import { editorPlaceholder } from "./lib/config";
import Grogu from './assets/grogu.png';

export class Editor {
    private editor: HTMLElement = document.createElement('div');

    private userAnswerInput: HTMLInputElement;

    private htmlViewer: EditorView;

    constructor() {
        this.editor.className = 'flex flex-col xl:w-[50%] w-[70%] items-center justify-start m-auto editor-container rounded-xl';

        const cssContainer: HTMLDivElement = document.createElement('div');
        cssContainer.className = 'flex flex-col relative z-[100] w-full bg-zinc-700 css-editor rounded-xl';
        const groguHelper = document.createElement('img');
        groguHelper.className = 'grogu-helper';
        groguHelper.src = Grogu as string;

        const htmlContainer: HTMLDivElement = document.createElement('div');
        htmlContainer.className = 'relative z-[100] w-full m-2 bg-zinc-700 html-viewer rounded-xl';

        cssContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">CSS Editor</span></div>
        <div class="flex rounded-b-xl">
            <span class="w-[30px] bg-teal-200 text-center text-gray-600 leading-8 border-r rounded-bl-xl text-[13px]">1</span>
            <input type="text" class="user-css-input px-2 py-1 focus:outline-none grow" placeholder="${editorPlaceholder}"/>
            <button class="check-answer w-[55px] text-center bg-teal-500 text-gray-600 rounded-br-xl hover:bg-teal-300 transition duration-150 ease-out hover:ease-in">Enter</button>
        </div>`;

        cssContainer.append(groguHelper);

        const checkAnswerButton = getElement<HTMLButtonElement>(cssContainer, '.check-answer');
        this.userAnswerInput = getElement<HTMLInputElement>(cssContainer, '.user-css-input');
        checkAnswerButton.addEventListener('click', () => checkAnswer(this.userAnswerInput.value));

        htmlContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">HTML Preview</span></div>`;

        this.editor.append(cssContainer, htmlContainer);

        this.htmlViewer = new EditorView({
            doc: '',
            extensions: [basicSetup],
            parent: htmlContainer,
        });
    }

    public checkAnswer(): void {
        checkAnswer(this.userAnswerInput.value);
    }

    public getContainer(): HTMLElement {
        return this.editor;
    }

    public clearInput(): void {
        getElement<HTMLInputElement>(this.editor, '.user-css-input').value = '';
    }

    public setHtmlViewer(text: string): void {
        this.htmlViewer.setState(EditorState.create({ doc: text, extensions: [basicSetup] }))
    }

    public showHelper(answer: string): void {
        getElement<HTMLImageElement>(this.editor, '.grogu-helper').classList.add('show');

        let counter = 0;
        this.userAnswerInput.value = '';

        const typer = setInterval(() => {
            this.userAnswerInput.value += answer[counter];
            counter += 1;

            if (counter === answer.length) {
                clearInterval(typer);

                this.removeHelper();
            }
        }, 200);
    }

    public removeHelper(): void {
        getElement<HTMLImageElement>(this.editor, '.grogu-helper').classList.remove('show');
    }
}