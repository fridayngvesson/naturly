import React from 'react'
import CardOverview from '../components/CardOverview'
import { boenden } from "../data/boenden"

const Boende = () => {
  return (
    <>
    <CardOverview data={boenden} title="Alla boenden" />
    </>

  )
}

export default Boende