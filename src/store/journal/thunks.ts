import { doc, setDoc, collection, getDocs, deleteDoc} from "firebase/firestore/lite"
import { AppDispatch, RootState} from "../store"
import { FirebaseDb } from "../../firebase/config"
import { Note, NotificationState } from "../../interfaces"
import { addNewNote, deleteNoteById, setActiveNote, setNotes, setSaving, showModal, updateNote } from "./journalSlice"
import { FirebaseError } from "firebase/app"
import { showSnackBar } from "../notifications/notificationsSlice"


const snackBar : NotificationState = {
    open: true,
    message: "Register correctly!",
    variant: "soft",
    color: "success",
    vertical: "top",
    horizontal: "right"
  }


const onError = (dispatch: AppDispatch, error: FirebaseError) => {
    snackBar.color = 'danger'
    snackBar.message = error.message
    dispatch(showSnackBar(snackBar))
}

const onSuccess = (dispatch: AppDispatch, message: string) => {
    snackBar.color = 'success'
    snackBar.message = message
    dispatch(showSnackBar(snackBar))
}


export const startNewNote = ({title, body}: Note) => (dispatch: AppDispatch, getState: () => RootState) => {
    
    dispatch(setSaving(true))
    const { uid } = getState().auth

    const newNote: Note = {
        id: "",
        title,
        body,
        date: new Date().getTime(),
        imageUrl: ['']
    }
    const newDoc = doc(collection(FirebaseDb, `/${uid}/journal/notes`))

    setDoc(newDoc, newNote)
        .then(() => {
            newNote.id = newDoc.id
            dispatch(addNewNote(newNote))
            dispatch(setActiveNote(newNote))
            snackBar.message= 'Note added correctly!'
            dispatch(showModal(false))
            dispatch(showSnackBar(snackBar))
        }).catch((error : FirebaseError) => {
            onError(dispatch, error)
        }).finally(() => {
            dispatch(setSaving(false))
        })
} 

export const getAllNotes = () => (dispatch: AppDispatch, getState: () => RootState) => {

    dispatch(setSaving(true))
    const {uid} = getState().auth

    const collectionRef = collection(FirebaseDb, `${uid}/journal/notes`)

    getDocs(collectionRef)
    .then(docs => {
        const notes: Note[] = []
        docs.forEach((doc) => {
            notes.push({
                id: doc.id,
                title: doc.data().title,
                body: doc.data().body,
                date:doc.data().date,
                imageUrl: []
            })
        })

        dispatch(setNotes(notes))
    })
    .catch((error: FirebaseError) =>{
        onError(dispatch, error)
    })
    .finally(()=>{
        dispatch(setSaving(false))
    })

    
}

export const updateCurrentNote = () => (dispatch: AppDispatch, getState: () => RootState) => {
    
    dispatch(setSaving(true))

    const {uid} = getState().auth
    const {active} = getState().journal
    const noteToUpdate = {...active}
    delete noteToUpdate.id


    const docRef = doc(FirebaseDb, `${uid}/journal/notes/${active!.id}`)
    setDoc(docRef,noteToUpdate, {merge: true} )
        .then(() =>{
            dispatch(updateNote(active!))
            onSuccess(dispatch, 'Updated successfully')
        })
        .catch((error: FirebaseError) => {
            console.error(error.message)
            onError(dispatch, error)
        })
        .finally(() => {
            dispatch(setSaving(false))
        })
}

export const deleteNote = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
    dispatch(setSaving(true))
    const {uid} = getState().auth
    const {active} = getState().journal
    const docRef = doc(FirebaseDb, `${uid}/journal/notes/${active!.id}`)
    deleteDoc(docRef)
     .then(() => {
        dispatch(deleteNoteById(active!))
        onSuccess(dispatch, 'Deleted successfully!!')
     })
     .catch((error: FirebaseError) => {
        onError(dispatch, error)
     })
     .finally(() => {
        dispatch(setSaving(false))
     })
}