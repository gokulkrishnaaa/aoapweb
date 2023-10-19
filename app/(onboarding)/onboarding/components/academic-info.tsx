"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import createCandidatePlustwo from "@/app/data/createCandidatePlustwo";
import updateOnboarding from "@/app/data/updateOnboarding";
import { useQuery } from "@tanstack/react-query";
import getStates from "@/app/data/getStates";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "flowbite-react";

const AcademicInfoSchema = yup.object().shape({
  stateId: yup.number().positive("Please select State"),
});

const AcademicInfo = () => {
  const router = useRouter();

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(AcademicInfoSchema)(data, context, options)
      );
      return yupResolver(AcademicInfoSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const res = await createCandidatePlustwo(data);

    const onboarding = await updateOnboarding({
      data: { status: true },
    });
    router.replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Academic Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            <em>
              <b>*</b> Note to indicate that the responsibility of entering the
              correct data lies with the candidate and university will not be
              responsible for not getting communication if wrong data is entered
            </em>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                12th Standard State <span className="text-red-600">*</span>
                {statesLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                <select
                  {...register("stateId", { valueAsNumber: true })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">--Select--</option>
                  {states &&
                    states.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors["stateId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["stateId"].message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isSubmitting ? "Processing" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default AcademicInfo;
