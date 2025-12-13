import { TypeUser } from "@/types/firebase";
import { TypeAddNewUserData, UpdateData } from "@/types/form";
import { timeStamp } from "@/utils/shared/common";
import { firebaseFireStore } from "@/utils/shared/firebase";
import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const getUsers = async () => {
  try {
    const contactRef = collection(firebaseFireStore, "users")
    const querySnapshot = await getDocs(contactRef)
    if (!querySnapshot.empty) {
      const contacts = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data() as TypeUser,
          id: doc.id
        }
      });
      return contacts
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getDeletedUsers = async () => {
  try {
    const contactRef = collection(firebaseFireStore, "users")
    const queryContact = query(contactRef, where("isDelete", "==", true))
    const querySnapshot = await getDocs(queryContact)
    if (!querySnapshot.empty) {
      const contacts = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data() as TypeUser,
          id: doc.id
        }
      });
      return contacts
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getUsersRange = async (start: number, end: number) => {
  try {
    const contactRef = collection(firebaseFireStore, "users")
    const queryContact = query(contactRef, where("isDelete", "==", false), where("createdAt", ">=", start), where("createdAt", "<=", end))
    const querySnapshot = await getDocs(queryContact)
    if (!querySnapshot.empty) {
      const contacts = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data() as TypeUser,
          id: doc.id
        }
      });
      return contacts
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getUserByDocId = async (docId: string) => {
  try {
    const docRef = doc(firebaseFireStore, "users", docId)

    const res = await getDoc(docRef)
    if (res.exists()) {
      return res.data() as TypeUser
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export const addUser = async (data: TypeAddNewUserData) => {
  try {
    const metadata = {
      createdAt: timeStamp(),
      actions: [],
      isDelete: false,
      label: [],
      lasteUpadteAt: timeStamp(),
      isFloating: false,
      ...data,
    }
    await addDoc(collection(firebaseFireStore, "users"), metadata)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateUserByDocId = async (
  docId: string,
  data: UpdateData
) => {
  try {
    const docRef = doc(firebaseFireStore, "users", docId);
    await updateDoc(docRef, {
      ...data,
      lasteUpadteAt: timeStamp()
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteUserPermanently = async (docId: string) => {
  try {
    const docRef = doc(firebaseFireStore, "users", docId);
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getUserCount = async () => {
  try {
    const q = query(
      collection(firebaseFireStore, "users"),
      where("isDelete", "==", false)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;

  } catch (error) {
    console.log(error)
    return []
  }
}

