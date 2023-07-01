import { Editor } from "@widgets/Editor";
import { Footer } from "@widgets/Footer";
import { Gamefield } from "@widgets/Gamefield";
import { Header } from "@widgets/Header";
import { LevelSelect } from "@/widgets/LevelSelect";

import './style.scss';

export class Game {
    private editor = new Editor();

    private footer = new Footer();

    private gamefield = new Gamefield();

    private header = new Header();

    private levelSelect = new LevelSelect();

    public start(): void {
        this.buildField();
    }

    private buildField(): void {
        const firstCol: HTMLDivElement = document.createElement('div');
        firstCol.className = 'h-full first-col';

        const secondCol: HTMLDivElement = document.createElement('div');
        secondCol.className = 'h-full second-col';

        firstCol.append(this.header.getContainer(), this.gamefield.getContainer(), this.editor.getContainer());
        secondCol.append(this.levelSelect.getContainer());

        document.body.append(firstCol);
        document.body.append(secondCol);

        /* document.body.append(this.footer.getContainer());
         */
    }
}
