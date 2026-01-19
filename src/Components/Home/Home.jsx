import React from "react";
import Section1 from "../Section1/Section1";
import Section4 from "../Section4/Section4";
import Section2 from "../Section2/Section2";
import Section5 from "../Section5/Section5";
import Section6 from "../Section6/Section6";
import Section7 from "../Section7/Section7";
import Spinner from "../Spinner/Spinner";

export default function Home() {
  return (
    <>
      <Spinner />

      <div className=" hidden md:block">
      <Section1 />
      </div>
      <Section2 />

      <Section4 />
      <Section5 />
      <Section6 />

      <Section7 />
    </>
  );
}
