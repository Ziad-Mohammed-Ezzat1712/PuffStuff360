import React from "react";
import Section1 from "../Section1/Section1";
import Section4 from "../Section4/Section4";
import Section2 from "../Section2/Section2";
import Section5 from "../Section5/Section5";
import Section6 from "../Section6/Section6";
import Section7 from "../Section7/Section7";
import Spinner from "../Spinner/Spinner";
import AgeVerification from "../AgeVerification/AgeVerification";

export default function Home() {
  return (
    <>
    <AgeVerification/>
      {/* <Spinner /> */}

      <div className=" hidden md:block">
      <Section1 />
      </div>
     <div className="my-12">
       <Section2 />
     </div>

      <Section4 />
      <div className="my-12">
      <Section5 />
      </div>
      <div className="my-12">
      <Section6 />
      </div>
<div className="my-12">
      <Section7 />
      </div>
    </>
  );
}
