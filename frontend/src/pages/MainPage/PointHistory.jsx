import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PointDetails from "../../components/MainPage/Myprofile/PointDetails/PointDetails"
import BackButton from "../../components/PublicUse/BackButton";


export default function PointHistory() {

  return (
  <>
    <Header />
    <BackButton />
    <PointDetails/>
  </>
  );
}
