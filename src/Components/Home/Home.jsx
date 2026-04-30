import React from "react";
import Section1 from "../Section1/Section1";
import Section4 from "../Section4/Section4";
import Section2 from "../Section2/Section2";
import Section5 from "../Section5/Section5";
import Section6 from "../Section6/Section6";
import Section7 from "../Section7/Section7";
import Spinner from "../Spinner/Spinner";
import AgeVerification from "../AgeVerification/AgeVerification";
import VapeWarningBar from "../VapeWarningBar/VapeWarningBar";
import Hero2 from "../hero/hero";

export default function Home() {
  return (
    <>
    <AgeVerification/>
      {/* <Spinner /> */}

      <div className="  md:block">
       
      {/* <Section1 /> */}
      <Hero2/>
      </div>
     <div className="my-12 max-w-[1800px] mx-auto">
       <Section2 />
     </div>

      <Section4 />
      <div className="my-12 max-w-[1800px] mx-auto">
      <Section5 />
      </div>
      <div className="my-12 max-w-[1800px] mx-auto">
      <Section6 />
      </div>
<div className="my-12 max-w-[1800px] mx-auto">
      <Section7 />
      </div>
    </>
  );
}
