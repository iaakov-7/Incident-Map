import { useState, type FormEvent } from "react";

const AuthForm = ({
  textButton,
  onSubmit,
}: {
  textButton: string;
  onSubmit: (email: string, password: string) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };
  return (
    <form onSubmit={HandleSubmit}>
      <input
        type="email"
        placeholder="מייל"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="סיסמא"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{textButton}</button>
    </form>
  );
};

export default AuthForm;
