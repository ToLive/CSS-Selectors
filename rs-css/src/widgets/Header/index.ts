export class Header {
    private header: HTMLDivElement;

    constructor() {
        console.log('This is Header');

        this.header = document.createElement('div');
        this.header.innerHTML = 'Header';
        this.header.classList.add('bg-black', 'h-[100px]');
    }

    public getHeader(): HTMLDivElement {
        return this.header;
    }
}