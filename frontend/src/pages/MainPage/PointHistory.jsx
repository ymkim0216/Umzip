import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PointDetails from "../../components/MainPage/Myprofile/PointDetails/PointDetails"



export default function PointHistory() {

  return (
  <>
    <Header />
    <PointDetails/>
  </>
  );
}
