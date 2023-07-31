import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

/**
 * 
 * @returns 
 */


export async function load() {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesData = [];
      querySnapshot.forEach((doc) => {
        recipesData.push({ id: doc.id, ...doc.data() });
      });
      return recipesData;
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  }

/**
 * 
 * @param {object} querySnapshot 
 * @returns 
 */
function processQuerySnapshot(querySnapshot) {
    const data = []
    querySnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return data
}