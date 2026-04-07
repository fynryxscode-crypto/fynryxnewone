"use client";

import { useParams } from "react-router-dom";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";
import { getIndustryBySlug } from "@/data/industriesData";
import { useEffect } from "react";

export default function Page() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug || "");

  useEffect(() => {
    if (industry) {
      document.title = `${industry.name} App Development | Fynryx`;
    }
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b14]">
        <p className="text-white text-xl">Industry not found.</p>
      </div>
    );
  }

  return (
    <IndustryPageTemplate slug={slug || ""} />
  );
}
