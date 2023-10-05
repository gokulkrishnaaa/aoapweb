import BreadCrumbs from "../components/breadcrumbs";
import SideNav from "./components/sidenav";
import GeneralWrapper from "./general/generalwrapper";

export default function Page() {
  return (
    <>
      <div className="pb-6">
        <BreadCrumbs />
      </div>
      <div className="lg:flex lg:gap-x-16 lg:px-8 bg-white shadow-sm border border-gray-100">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <SideNav />
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <GeneralWrapper />
        </main>
      </div>
    </>
  );
}
