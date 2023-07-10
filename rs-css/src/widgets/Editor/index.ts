
import './style.scss';
import { getElement } from "@shared/helpers";
import * as StateApi from "@shared/state/api";
import { checkAnswer } from "@features/levels";
import { editorPlaceholder } from "./lib/config";
import Grogu from './assets/grogu.png';
import { HighlightedElement } from './types';

export class Editor {
    private editor: HTMLElement = document.createElement('div');

    private userAnswerInput: HTMLInputElement;

    private checkAnswerButton: HTMLButtonElement;

    private htmlContainer: HTMLDivElement;

    private htmlViewer: HTMLDivElement = document.createElement('div');

    private indentSize = 4;

    constructor() {
        this.editor.className = 'flex flex-col relative z-[100] xl:w-[50%] w-[70%] items-center justify-start m-auto editor-container rounded-xl';

        const cssContainer: HTMLDivElement = document.createElement('div');
        cssContainer.className = 'flex flex-col relative z-[100] w-full bg-zinc-700 css-editor rounded-xl';
        const groguHelper = document.createElement('img');
        groguHelper.className = 'grogu-helper';
        groguHelper.src = Grogu as string;

        this.htmlContainer = document.createElement('div');
        this.htmlContainer.className = 'html-editor relative z-[100] w-full m-2 bg-zinc-700 html-viewer rounded-xl';

        cssContainer.innerHTML = `<div class="p-2 relative z-[100] rounded-xl text-white h-[35px]"><span class="text-center">CSS Editor</span></div>
        <div class="flex relative z-[100] rounded-b-xl">
            <span class="w-[30px] bg-teal-200 text-center text-gray-600 leading-8 border-r rounded-bl-xl text-[13px]">1</span>
            <input type="text" class="user-css-input blink-background px-2 py-1 focus:outline-none grow" placeholder="${editorPlaceholder}"/>
            <button class="check-answer w-[55px] text-center bg-teal-500 text-gray-600 rounded-br-xl hover:bg-teal-300 transition duration-150 ease-out hover:ease-in">Enter</button>
        </div>`;

        this.editor.append(groguHelper);

        this.checkAnswerButton = getElement<HTMLButtonElement>(cssContainer, '.check-answer');
        this.userAnswerInput = getElement<HTMLInputElement>(cssContainer, '.user-css-input');
        this.addListeners();

        this.htmlContainer.innerHTML = `<div class="p-2 rounded-xl text-white h-[35px]"><span class="text-center">HTML Preview</span></div><div class="editor">`;
        this.htmlViewer.className = 'space';
        this.htmlContainer.append(this.htmlViewer);

        this.editor.append(cssContainer, this.htmlContainer);
    }

    private addListeners(): void {
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
                const currentLevel = StateApi.getCurrentLevel();

                StateApi.changeLevelStat({
                    num: currentLevel,
                    solved: true,
                    isHintUsed: StateApi.getLevelStatus(currentLevel)?.isHintUsed || false,
                });

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
    }

    public checkAnswer(): void {
        if (checkAnswer(this.userAnswerInput.value)) {
            const currentLevel = StateApi.getCurrentLevel();

            StateApi.changeLevelStat({
                num: currentLevel,
                solved: true,
                isHintUsed: false,
            });

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

    private highlightElement(element: HTMLElement, indent: string): HighlightedElement {
        const tag = element.tagName.toLowerCase();
        const id = element.id
            ? `<span class="key"> id=</span><span class="value">"${element.id}"</span>`
            : '';

        const classes = element.classList.length
            ? `<span class="key"> class=</span><span class="value">"${element.classList.toString()}"</span>`
            : '';

        return {
            openTag: `${indent}&lt;${tag}${id}${classes}&gt;`,
            closeTag: `${indent}&lt;/${tag}&gt;`,
        }
    }

    private wrapNodesAndTransformToText(doc: string): string {
        let counter = -2;
        let indentLevel = 0;
        const COUNTER_STEP = 1;

        const getIndentation = (): string => '&nbsp;'.repeat(indentLevel * this.indentSize);

        const wrapNode = (node: Node): string => {
            if (node.nodeType === Node.TEXT_NODE) {
                return '';
            }

            let hasChildren = false;
            const hl = this.highlightElement(node as HTMLElement, getIndentation());
            counter += COUNTER_STEP;

            let wrap = `<div class="highlight-block" data-id="${counter}">${hl.openTag}`;

            // eslint-disable-next-line no-magic-numbers
            if (node.childNodes && node.childNodes.length > 0) {
                indentLevel += COUNTER_STEP;
                hasChildren = true;

                node.childNodes.forEach((child: Node) => {
                    wrap += wrapNode(child);
                });

                indentLevel -= COUNTER_STEP;
            }

            wrap += hasChildren ? hl.closeTag : hl.closeTag.replace(/&nbsp;/g, '');
            wrap += '\n</div>';

            return wrap;
        }

        this.htmlViewer.innerHTML = doc;

        return wrapNode(this.htmlViewer);
    }

    public setHtmlViewer(text: string): void {
        this.htmlViewer.innerHTML = this.wrapNodesAndTransformToText(text);

        this.htmlViewer.querySelectorAll('.space div > div').forEach((item) => {
            (item as HTMLElement).addEventListener('mouseover', (e) => {
                this.htmlViewer.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));

                (e.target as HTMLElement).classList.add('selected');

                const elemId = (e.target as HTMLElement).dataset.id || '';

                StateApi.setSelectedItem(Number(elemId));
            })

            item.addEventListener('mouseleave', () => {
                StateApi.setSelectedItem(StateApi.NOT_SET_ITEM);
                item.classList.remove('selected');
            })
        })
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