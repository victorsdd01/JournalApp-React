import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { SignUpForm } from "../interfaces";

const provider = new GoogleAuthProvider()
FirebaseAuth.languageCode= 'en'

export const signIn = (email: string, password: string) : Promise<UserCredential> => signInWithEmailAndPassword(FirebaseAuth, email, password)

export const signInWithGoogle = () : Promise<UserCredential> => signInWithPopup(FirebaseAuth, provider)

export const signOutGoogle = (): Promise<void> => FirebaseAuth.signOut()

export const addNewUser = (user : SignUpForm): Promise<UserCredential> => createUserWithEmailAndPassword(FirebaseAuth, user.email, user.password)
