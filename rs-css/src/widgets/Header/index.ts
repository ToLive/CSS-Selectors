import { HeaderProps, IHeader } from "./types";
import Logo from './assets/dish-plate.svg';

export class Header implements IHeader {
    private header: HTMLElement;

    private props: HeaderProps = {
        className: ['p-2', 'h-[100px]'],
        logo: Logo as string,
        title: 'RS CSS Diner',
    };

    constructor() {
        this.header = document.createElement('header');
        this.header.className = this.props.className.join(' ');

        const elements = `<div class="flex"><img class="w-[20px] h-[20px]" src="${this.props.logo}" alt="logo"><span class="ml-[10px] text-gray-400 font-bold">${this.props.title}</span></div>`;

        this.header.insertAdjacentHTML('afterbegin', elements);
    }

    public getContainer(): HTMLElement {
        return this.header;
    }
}