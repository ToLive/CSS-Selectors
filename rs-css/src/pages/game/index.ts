import { Description } from "@widgets/Description";
import { Editor } from "@widgets/Editor";
import { Examples } from "@widgets/Examples";
import { Footer } from "@widgets/Footer";
import { Gamefield } from "@widgets/Gamefield";
import { Header } from "@widgets/Header";
import { Levelselect } from "@widgets/Levelselect";

export class Game {
    private description = new Description();

    private editor = new Editor();

    private examples = new Examples();

    private footer = new Footer();

    private gamefield = new Gamefield();

    private header = new Header();

    private levelselect = new Levelselect();

    public start(): void {
        console.log('This is Game');

        this.buildField();
    }

    private buildField(): void {
        document.body.append(this.header.getContainer());
        /* document.body.append(this.gamefield.getHeader());
        document.body.append(this.editor.getHeader());
        document.body.append(this.footer.getHeader());
        document.body.append(this.levelselect.getHeader());
        document.body.append(this.description.getHeader());
        document.body.append(this.examples.getHeader()); */
    }
}
