export type GameFieldProps = {
    className: string[];
    title: string;
    buttonTitle: string;
    buttonHandler: (event: Event) => void;
}

export interface IGameField {
    getContainer(): HTMLElement;
}