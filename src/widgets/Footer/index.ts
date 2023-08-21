import { getElement } from '../../shared/helpers/api/getElement';
import Rslogo from './assets/rs_school_js.svg';

export class Footer {
    private footer: HTMLElement = document.createElement('div');

    constructor() {
        const footerLogo = document.createElement('img');
        footerLogo.className = 'footer-logo h-[50px] p-2';
        footerLogo.src = Rslogo as string;

        this.footer.innerHTML = `
        <footer class="flex h-[50px] justify-center items-center self-end">
        <p class="made-by text-zinc-400">
            Made by <a href="https://github.com/ToLive">ToLive </a>
        </p>

        <a class="rslink ml-4" href="https://rs.school/js/">            
        </a>
    </footer>
    `;

        const rslink = getElement(this.footer, '.rslink');
        rslink.append(footerLogo);

    }

    public getContainer(): HTMLElement {
        return this.footer;
    }
}