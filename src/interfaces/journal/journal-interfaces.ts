import { Dialogs } from "../../journal"


export interface SideBarItem {
    id: number,
    header: string,
    description: string
}

export interface GalleryImage {
    id: number,
    title: string,
    img: string
}

export interface Note {
    id: string,
    title: string,
    body: string,
    date: number,
    imageUrl: string[]
}

export interface JournalState {
    isSaving: boolean,
    notes: Note[],
    active: Note | null,
    showDialog: Record<Dialogs,boolean>
}