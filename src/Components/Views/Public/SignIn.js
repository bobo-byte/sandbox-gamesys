import { useState } from "react";
import { auth, db } from "../../../Config/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  if (loading) return <div>...Loading</div>;

  if (user) {
    console.log(user);

    // navigate("/dashboard");
  }

  function handleSignIn(email, password) {
    signInWithEmailAndPassword(email, password).then(async () => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);
      const userRole = docSnap.data().role;
    });
  }

  return (
    <div>
      <h1>Welcome to Sign in</h1>
      <h2>Please enter your email and password</h2>

      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            signInWithEmailAndPassword(email, password);
          }}
        >
          <label for="" style={{ display: "block", padding: 5 }}>
            Username - Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email i.e johndoe@domain.com"
            onChange={({ target: { value } }) => setEmail(value)}
          />

          <label for="" style={{ display: "block", padding: 5 }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={({ target: { value } }) => setPassword(value)}
          />

          <button type="submit"> Sign in </button>
        </form>
      </div>

      {error ? <h3>Error: {error.message}</h3> : null}
    </div>
  );
};
