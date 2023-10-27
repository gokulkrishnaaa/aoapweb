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
      <section className="relative isolate overflow-hidden h-screen bg-neutral-200">
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
            <p className="font-semibold uppercase text-sm lg:w-[420px] lg:text-right">
              Amrita - UG Admission - 2024
            </p>
            <p className="font-semibold lg:order-2 uppercase text-sm lg:w-[420px]">
              Amrtia Online Admissions Portal (AOAP)
            </p>
          </div>
        </header>

        <div className="pt-14">
          <Image
            src="/images/amrita-hero-image.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 h-full w-full bg-black opacity-75"></div>
          <div className="max-w-6xl mx-auto mt-10 px-6 flex flex-col gap-10">
            <div className="lg:order-1 flex flex-col gap-10">
              <SignIn />
              <h2 className="text-4xl text-center font-bold tracking-tight text-white sm:text-6xl">
                Let your success story start with Amrita
              </h2>
            </div>
            <div>
              <AdmissionSteps />
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-10 lg:mt-24 px-6 flex flex-col gap-10 lg:gap-20">
            <Image
              src="/images/amrita-footer.png"
              width={1876}
              height={168}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
