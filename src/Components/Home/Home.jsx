// eslint-disable-next-line no-unused-vars
import React from 'react'

import MainSlider from '../MainSlider/MainSlider'
import Section1 from '../Section1/Section1'
import Section4 from '../Section4/Section4'
import Section2 from '../Section2/Section2'
import Section3 from '../Section3/Section3'
import Section5 from '../Section5/Section5'
import Section6 from '../Section6/Section6'
import Section7 from '../Section7/Section7'


export default function Home() {
 

  return (
    <>

    {/* <MainSlider/> */}
    <div className=' hidden md:block'>
      <Section1/>
    </div>
  <Section2/>
{/* <Section3/> */}
<Section4/>
<Section5/>
<Section6/>

<Section7/>
    </>
  )
}
