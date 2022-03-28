import { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  limit,
  limitToLast,
  endBefore,
  onSnapshot,
  getFirestore,
  getDocs,
  query,
  startAfter
} from "firebase/firestore";

export default () => {
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(1);

  const LIMIT = 5;
  const COLLECTION = "book";
  const ORDERBY = "title";
  const DB = getFirestore();
  useEffect(() => {
    // const queryResult = query(
    //   collection(DB, COLLECTION),
    //   orderBy(ORDERBY),
    //   limit(LIMIT)
    // );
    // const unsubscribe = onSnapshot(queryResult, (querySnapshot) => {
    //   const books = [];
    //   querySnapshot.forEach((doc) =>
    //     books.push({ key: doc.id, ...doc.data() })
    //   );
    //   setBookList(books);
    // });
    // return unsubscribe();
    // (async () => {
    //   const querySnapshot = await getDocs(collection(DB, "book"));
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // })();
  }, []);

  function next({ book }) {
    if (bookList.length === 0) return;

    const queryResult = query(
      collection(DB, COLLECTION),
      orderBy(ORDERBY),
      startAfter(book.title),
      limit(LIMIT)
    );
    const books = [];
    const unsubscribe = onSnapshot(queryResult, (doc) =>
      books.push({ key: doc.id, ...doc.data() })
    );
    setBookList(books);
    setPage(page + 1);

    unsubscribe();
  }

  function previous({ book }) {
    const queryResult = query(
      collection(DB, COLLECTION),
      orderBy(ORDERBY),
      endBefore(book.title),
      limitToLast(LIMIT)
    );

    const books = [];
    const unsubscribe = onSnapshot(queryResult, (doc) =>
      books.push({ key: doc.id, ...doc.data() })
    );
    setBookList(books);
    setPage(page - 1);

    unsubscribe();
  }

  return (
    <div>
      <div>
        {bookList.map((doc) => (
          <tr key={doc.key}>
            <td>{doc.title}</td>
            <td>{doc.date}</td>
            <td>{doc.price}</td>
          </tr>
        ))}
      </div>

      <div>
        {page === 1 ? null : (
          <button onClick={() => previous({ book: bookList[0] })}>
            Previous
          </button>
        )}

        {bookList.length < LIMIT ? null : (
          <button onClick={() => next({ book: bookList[bookList.length - 1] })}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
