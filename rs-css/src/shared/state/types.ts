import { SavedLevel } from "@entities/localStorage/types"

export type State = {
    currentLevel: number,
    levelStat: SavedLevel[] | null,
}

export type EventDetail = {
    levelNum: number;
    savedLevel: SavedLevel;
}