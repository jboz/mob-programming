import { getApps, initializeApp } from 'firebase/app';
import { DocumentSnapshot, collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { Dispatch, useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDldNgIUU0pIffOVujEZPzDdLXZVLKAYck',
  authDomain: 'mob-programming-x.firebaseapp.com',
  databaseURL: 'https://mob-programming-x.firebaseio.com',
  projectId: 'mob-programming-x',
  storageBucket: 'mob-programming-x.appspot.com',
  messagingSenderId: '932286802303',
  appId: '1:932286802303:web:746d3c6ea783a9b730124a'
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebaseApp);

export const useCollection = <S = unknown>(path: string): [S[] | undefined, (path: string, value: S) => void] => {
  const [value, setValue] = useState<S[]>();
  const q = collection(db, path);

  useEffect(() => {
    onSnapshot(q, snapshot => {
      setValue(snapshot.docs.map(doc => doc.data() as S));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addValue = (docPath: string, data: Partial<S>) => {
    setDoc(doc(db, path + '/' + docPath), data, {
      merge: true
    });
  };

  return [value, addValue];
};

export const useDoc = <S = unknown>(
  collection: string,
  path: string
): [S | undefined, Dispatch<Partial<S>>, DocumentSnapshot | undefined] => {
  const [value, setValue] = useState<S>();
  const [snapshot, setSnapshot] = useState<DocumentSnapshot>();

  useEffect(() => {
    if (path) {
      const q = doc(db, collection + '/' + path);

      onSnapshot(q, s => {
        setSnapshot(s);
        setValue(s.data() as S);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateValue = (data: Partial<S>) => {
    setDoc(doc(db, collection + '/' + path), data, {
      merge: true
    });
  };

  return [value, updateValue, snapshot];
};
