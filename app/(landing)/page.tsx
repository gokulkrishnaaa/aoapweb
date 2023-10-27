import { redirect } from "next/navigation";
import getUser from "../data/getuser";
import SignIn from "./components/signin";
import Image from "next/image";
import AdmissionSteps from "./components/admissionsteps";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

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
        <header className="flex bg-pink-800">
          <div className="mx-auto flex text-white flex-col lg:flex-row items-center justify-center gap-3 lg:gap-10 py-5 lg:py-0">
            <div className="lg:order-1 lg:relative lg:top-3 lg:z-10 shadow-lg">
              <Image
                src="/images/Amritalogo.png"
                width={200}
                height={50}
                alt=""
                className="rounded-lg"
              />
            </div>
            <p className="font-semibold uppercase lg:text-lg lg:w-[420px] lg:text-right">
              Amrita - UG Admission - 2024
            </p>
            <p className="font-semibold lg:order-2 uppercase lg:text-lg lg:w-[420px]">
              Amrtia Online Admissions Portal (AOAP)
            </p>
          </div>
        </header>

        <div className="h-screen relative isolate overflow-hidden pt-14">
          <Image
            src="/images/amrita-hero-image.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 h-full w-full bg-black opacity-50"></div>
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div>
            <SignIn />
            <div className="max-w-6xl mx-auto mt-20 px-6">
              <AdmissionSteps />
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
