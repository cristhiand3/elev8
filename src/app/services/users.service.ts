import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private auth: Auth) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        return userCredentials;
      })
      .catch((error) => console.error(error));
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        return userCredentials;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  is_user_logged_in() {
    const user = this.auth.currentUser;
    if (user) {
      return true;
    }
    return false;
  }

  logout() {
    console.log('User logged out');
    return signOut(this.auth);
  }


  get_user() {
    const user = this.auth.currentUser;
    if (user) {
      return {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      };
    } else {
      return null;
    }
  }

  google_login() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  facebook_login() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

}
