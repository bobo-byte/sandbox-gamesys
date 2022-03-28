import "./styles.css";
// import RouteManager from "./Components/Routes/RouteManager";
import { useBooks } from "./Hooks/Firebase/books";

export default function App() {
  const [data, loading, error] = useBooks();

  console.log(data);

  if (data.length)
    return (
      <table border="1" cellspacing="1">
        <thead>
          <tr>
            <td>title</td>
            <td>date</td>
            <td>price</td>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.key}>
              <td>{doc.title}</td>
              <td>{doc.date}</td>
              <td>{doc.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <h3>Error: FirebaseError</h3>
        <p>{error.message} </p>
      </div>
    );

  return <>Device</>;
}
