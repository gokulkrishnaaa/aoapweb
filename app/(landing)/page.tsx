import { redirect } from "next/navigation";
import getUser from "../data/getuser";
import SignIn from "./components/signin";

export default async function Page() {
  const user = await getUser();
  console.log(user);
  if (user) {
    if (user.onboardingstatus) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div>
      <section className="h-screen bg-neutral-200">
        <SignIn />
      </section>
    </div>
  );
}
