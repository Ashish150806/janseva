import { useContext } from "react";
import { ReportContext } from "../context/ReportContext";

export default function useReport() {
  return useContext(ReportContext);
}
