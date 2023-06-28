export type HeaderProps = {
    className: string[];
    logo: string;
    title: string;
}

export interface IHeader {
    getContainer(): HTMLElement;
}