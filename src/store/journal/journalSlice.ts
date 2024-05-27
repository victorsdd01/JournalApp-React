import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {  JournalState, Note } from '../../interfaces'
import { Dialogs } from '../../journal'


const initialState: JournalState = {
    isSaving: false,
    notes: [],
    active: null,
    showDialog: {
        [Dialogs.NEW_NOTE]: false,
        [Dialogs.BASIC]: false
    },
}
export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        addNewNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload
        },
        setNotes: (state, actions: PayloadAction<Note[]>) => {
            state.notes = actions.payload
        },
        setSaving: (state, actions: PayloadAction<boolean>) => {
            state.isSaving = actions.payload
        },
        updateNote: (state, actions: PayloadAction<Note>) => {
           const note = state.notes.find(note => note.id === actions.payload.id)
           note!.title = actions.payload.title
           note!.body = actions.payload.body
        },
        deleteNoteById: (state, actions:PayloadAction<Note>) =>{
            const notes = state.notes.filter(note => note.id !== actions.payload.id)
            state.notes = notes
            state.active = null
        },
        setImagesUrls: (state, actions: PayloadAction<string[]>) => {
            state.active!.imageUrl = [...state.active!.imageUrl, ...actions.payload]
        },
        showModal: (state, actions: PayloadAction<{id:Dialogs,show:boolean}> )=> {
            state.showDialog[actions.payload.id] = actions.payload.show;
        }
    },
})
export const { 
  addNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  showModal,
  setImagesUrls
} = journalSlice.actions
