import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyA2pPimRTjN1vrzxYccj-KEF5ttXC6Xi9M",
    authDomain: "vanlife-26fb0.firebaseapp.com",
    projectId: "vanlife-26fb0",
    storageBucket: "vanlife-26fb0.firebasestorage.app",
    messagingSenderId: "582470785884",
    appId: "1:582470785884:web:015cabe4a3364294557f99",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return vans;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const snapshot = await getDoc(docRef);
    return { ...snapshot.data(), id: id };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const snapshot = await getDocs(q);
    const hostVans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return hostVans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login", { method: "post", body: JSON.stringify(creds) });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
}
