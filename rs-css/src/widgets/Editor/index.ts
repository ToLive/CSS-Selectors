import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state"
import './style.scss';
import { getElement } from "@shared/helpers/getElement";
import { checkAnswer } from "@features/levels";
import { editorPlaceholder } from "./lib/config";
import Grogu from './assets/grogu.png';
import { changeLevelStat } from "../../shared/state/api/changeLevelStat/changeLevelStat";
import { setCurrentLevel } from "../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../shared/state/api/getCurrentLevel/getCurrentLevel";
import { LEVEL_STEP } from "../../features/levels/lib/config";

export class Editor {
    private editor: HTMLElement = document.createElement('div');

    private userAnswerInput: HTMLInputElement;

    private checkAnswerButton: HTMLButtonElement;

    private htmlViewer: EditorView;

    constructor() {
        this.editor.className = 'flex flex-col relative z-[100] xl:w-[50%] w-[70%] items-center justify-start m-auto editor-container rounded-xl';

        const cssContainer: HTMLDivElement = document.createElement('div');
        cssContainer.className = 'flex flex-col relative z-[100] w-full bg-zinc-700 css-editor rounded-xl';
        const groguHelper = document.createElement('img');
        groguHelper.className = 'grogu-helper';
        groguHelper.src = Grogu as string;

        const htmlContainer: HTMLDivElement = document.createElement('div');
        htmlContainer.className = 'relative z-[100] w-full m-2 bg-zinc-700 html-viewer rounded-xl';

        cssContainer.innerHTML = `<div class="p-2 relative z-[100] rounded-xl text-white h-[35px]"><span class="text-center">CSS Editor</span></div>
        <div class="flex relative z-[100] rounded-b-xl">
            <span class="w-[30px] bg-teal-200 text-center text-gray-600 leading-8 border-r rounded-bl-xl text-[13px]">1</span>
            <input type="text" class="user-css-input blink-background px-2 py-1 focus:outline-none grow" placeholder="${editorPlaceholder}"/>
            <button class="check-answer w-[55px] text-center bg-teal-500 text-gray-600 rounded-br-xl hover:bg-teal-300 transition duration-150 ease-out hover:ease-in">Enter</button>
        </div>`;

        this.editor.append(groguHelper);

        this.checkAnswerButton = getElement<HTMLButtonElement>(cssContainer, '.check-answer');
        this.userAnswerInput = getElement<HTMLInputElement>(cssContainer, '.user-css-input');
        this.userAnswerInput.addEventListener('input', () => {
            if (this.userAnswerInput.value === '') {
                this.checkAnswerButton.classList.remove('blink-enter');
                this.userAnswerInput.classList.add('blink-background')
            } else {
                this.checkAnswerButton.classList.add('blink-enter');
                this.userAnswerInput.classList.remove('blink-background');
            }
        });
        this.checkAnswerButton.addEventListener('click', () => {
            if (checkAnswer(this.userAnswerInput.value)) {
                console.log('check ok');

                const currentLevel = getCurrentLevel();

                changeLevelStat({
                    num: currentLevel,
                    solved: true,
                    isHintUsed: false,
                });

                // setCurrentLevel(currentLevel + LEVEL_STEP);

                return;
            };

            const ANIM_DELAY = 1000;

            if (this.editor.classList.contains('shake-editor')) {
                this.editor.classList.remove('shake-editor');
                this.editor.classList.add('shake-editor');
            } else {
                this.editor.classList.add('shake-editor');
                setTimeout(() => this.editor.classList.remove('shake-editor'), ANIM_DELAY);
            }
        });

        htmlContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">HTML Preview</span></div>`;

        this.editor.append(cssContainer, htmlContainer);

        this.htmlViewer = new EditorView({
            doc: '',
            extensions: [basicSetup],
            parent: htmlContainer,
        });
    }

    public checkAnswer(): void {
        if (checkAnswer(this.userAnswerInput.value)) {
            console.log('check ok');

            const currentLevel = getCurrentLevel();

            changeLevelStat({
                num: currentLevel,
                solved: true,
                isHintUsed: false,
            });

            // setCurrentLevel(currentLevel + LEVEL_STEP);

            return;
        };

        const ANIM_DELAY = 1000;

        if (this.editor.classList.contains('shake-editor')) {
            this.editor.classList.remove('shake-editor');
            this.editor.classList.add('shake-editor');
        } else {
            this.editor.classList.add('shake-editor');
            setTimeout(() => this.editor.classList.remove('shake-editor'), ANIM_DELAY);
        }
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

        this.userAnswerInput.focus();

        const COUNTER_STEP = 1;
        const TYPING_DELAY = 200;

        const typer = setInterval(() => {
            this.userAnswerInput.classList.remove('blink-background');
            this.checkAnswerButton.classList.add('blink-enter');
            this.userAnswerInput.value += answer[counter];
            counter += COUNTER_STEP;

            if (counter === answer.length) {
                clearInterval(typer);

                this.removeHelper();
            }
        }, TYPING_DELAY);
    }

    public removeHelper(): void {
        getElement<HTMLImageElement>(this.editor, '.grogu-helper').classList.remove('show');
    }
}