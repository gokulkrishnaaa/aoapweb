import BreadCrumbs from "@/app/(candidate)/components/breadcrumbs";
import { getProductByCode } from "@/app/data/getProductByCode";
import { redirect } from "next/navigation";
import React from "react";
import EntranceCheckout from "../../components/entrancecheckout";
import { getApplicationById } from "@/app/data/application";

const Page = async ({ params }) => {
  // get application id
  let application = await getApplicationById({ applicationid: params.applnid });

  if (!application) {
    redirect("/applications");
  }
  // get product by code
  const product = await getProductByCode("aeeeentrance");

  // create the form to submit to payment gateway
  //   console.log("product", product);
  //   console.log(application);

  return (
    <div>
      <BreadCrumbs application={application} />
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
        <EntranceCheckout product={product} application={application} />
      </div>
    </div>
  );
};

export default Page;
