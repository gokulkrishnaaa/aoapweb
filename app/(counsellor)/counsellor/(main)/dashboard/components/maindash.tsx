"use client";
import { searchCandidate } from "@/app/data/search/candidate";
import React, { useRef, useState } from "react";
import v from "voca";
import CandidateList from "./candidatelist";
import ApplnCandidates from "./applncandidates";
import { searchApplication } from "@/app/data/search/application";
const MainDash = () => {
  const [searchBy, setSearchBy] = useState(null);
  const [searchSubBy, setSearchSubBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const subSelectionRef = useRef(null);

  let searchTitle = "Query";
  let showSearchTerm = false;

  if (searchBy) {
    if (searchBy === "candidate") {
      if (searchSubBy) {
        showSearchTerm = true;
        searchTitle = v.capitalize(searchSubBy);
      } else {
        showSearchTerm = false;
      }
    }
    if (searchBy === "application") {
      if (searchSubBy) {
        showSearchTerm = true;
        searchTitle = `${searchSubBy.toUpperCase()} Application No. ( Avoid Prefix "${searchSubBy.toUpperCase()}-" )`;
      } else {
        showSearchTerm = false;
      }
    }
  } else {
    showSearchTerm = false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (searchTerm != "") {
      setIsSearching(true);
      setSearchResults(null);
      if (searchBy === "candidate") {
        let input = {};
        input[searchSubBy] = searchTerm;
        const results = await searchCandidate(input);
        setSearchResults(results);
      }
      if (searchBy === "application") {
        let input = {};
        input[searchSubBy] = `${searchSubBy.toUpperCase()}-${searchTerm}`;
        const results = await searchApplication(input);
        setSearchResults(results);
      }
      setIsSearching(false);
    } else {
      setError("Search Term Missing");
    }
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Search Details
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Search By
              </label>
              <div className="relative mt-2">
                <select
                  onChange={(e) => {
                    setSearchBy(e.target.value === "" ? null : e.target.value);
                    setSearchSubBy(null);
                    setError(null);
                    setSearchTerm("");
                    setSearchResults(null);
                    if (subSelectionRef.current) {
                      subSelectionRef.current.value = "";
                    }
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  <option value="candidate">Candidate</option>
                  <option value="application">Application</option>
                </select>
              </div>
            </div>
            {searchBy ? (
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Search For
                </label>
                <div className="relative mt-2">
                  <select
                    ref={subSelectionRef}
                    onChange={(e) => {
                      setSearchSubBy(
                        e.target.value === "" ? null : e.target.value
                      );
                      setError(null);
                      setSearchTerm("");
                      setSearchResults(null);
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">--Select--</option>
                    {searchBy === "candidate" ? (
                      <>
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="name">Name</option>
                      </>
                    ) : searchBy === "application" ? (
                      <>
                        <option value="aeee">AEEE</option>
                        <option value="jee">JEE</option>
                      </>
                    ) : null}
                  </select>
                </div>
              </div>
            ) : null}
            {showSearchTerm ? (
              <>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {searchTitle}
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6 flex justify-between">
                  <p className="text-red-500 text-sm">{error ? error : ""}</p>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        {searchResults ? (
          searchBy === "candidate" ? (
            <CandidateList results={searchResults} />
          ) : searchBy === "application" ? (
            <ApplnCandidates exam={searchSubBy} results={searchResults} />
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default MainDash;
