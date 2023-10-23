import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService) {

  }

  //========Autenticación de usuarios con Firebase================

  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  singUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState() {
    return this.auth.authState;
  }

  async signOut() {
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    localStorage.removeItem('user');

  }
  //========CRUD de tareas con Firebase================

  //Leer datos
  getSubCollection(path: string, subcollectionName: string) {
    return this.db.doc(path).collection(subcollectionName).valueChanges({ idField: 'id' });
  }

  //Crear datos 
  addToSubCollection(path: string, subcollectionName: string, object: any) {
    return this.db.doc(path).collection(subcollectionName).add(object);
  }

  //Actualizar datos
  updateDocument(path: string, object: any) {
    return this.db.doc(path).update(object);
  }
  //
  deleteDocument(path: string) {
    return this.db.doc(path).delete();
  }
}

