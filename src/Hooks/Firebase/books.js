import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const COLLECTION = "book";

async function fetchData() {
  return await getDocs(collection(db, COLLECTION));
}

function useBooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((ref) => {
        const books = [];
        ref.forEach((snap) => {
          books.push({ key: snap.id, ...snap.data() });
        });
        setData(books);
        setLoading(true);
      })
      .catch((error) => setError(error));
  }, []);

  return [data, loading, error];
}

export { useBooks };
