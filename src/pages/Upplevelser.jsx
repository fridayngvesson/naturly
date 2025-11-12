import React from "react";
import CardOverview from "../components/CardOverview";
import { upplevelser } from "../data/upplevelser";

const Upplevelser = () => {
  return (
    <div>
      <CardOverview data={upplevelser} title="Alla upplevelser" />
    </div>
  );
};

export default Upplevelser;
