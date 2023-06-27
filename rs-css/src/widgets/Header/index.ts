export class Header {
    private header: HTMLDivElement;

    constructor() {
        console.log('This is Header');

        this.header = document.createElement('div');
        this.header.innerHTML = 'Header';
        this.header.classList.add('header');
    }

    public getHeader(): HTMLDivElement {
        return this.header;
    }
}