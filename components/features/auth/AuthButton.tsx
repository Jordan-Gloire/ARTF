import { getAuthSession } from "@/src/lib/auth";
import LogInButton from "./LogInButton";
import LoggedIn from "./LoggedIn";

export type AuthButtonProps = {};

async function AuthButton(props: AuthButtonProps) {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <LogInButton />;
  }

  return <LoggedIn user={user} />;
}

export default AuthButton;
