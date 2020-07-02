import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDb2Za8IvmyvVl687jh4QfdQpg7JULzipU",
  authDomain: "ecommerce-react-shop.firebaseapp.com",
  databaseURL: "https://ecommerce-react-shop.firebaseio.com",
  projectId: "ecommerce-react-shop",
  storageBucket: "ecommerce-react-shop.appspot.com",
  messagingSenderId: "648792935315",
  appId: "1:648792935315:web:6e64d56f6c27b3ba78f666",
  measurementId: "G-W36J6RJJN9"
};

// 7-12 ovo je za spremanje korisnika u moj DB, za razliku od Googlovog auth
// jer moram imati kolekciju korisnika ...prilikom svake promjene korisnika ova funkcija se izvršava...bilo da je sign in, log in ili log out
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // ako nema user objekta (null) onda ne radim ništa,
  //to znači da se promjena dogodila na log off
  if (!userAuth) return;

  // prvo dohvatim referencu na "mogući" dokument tog korisnika kojeg ispitivam
  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  // dohvatim snapshot tog dokumenta
  const snapshot = await userRef.get();

  // ako snapshot ne postoji to znači da korisnik nije snimljen u DB
  if (!snapshot.exists) {
    console.log("pravim novi dokument u firestoreu, jer nemam ovoga korisnika");
    const { displayName, email } = userAuth; // iz dobivenog objekta izvučem osnovne podatke o useru koje trebam
    const createdAt = new Date();

    // probaj spremiti novi dokument na prijašnju referencu
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  // vratit ću referencu, jer mi može zatrebati za daljnje procese
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
