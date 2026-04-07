"use client";

import { useParams } from "react-router-dom";
import AISolutionPageTemplate from "@/components/AISolutionPageTemplate";
import { getAIServiceBySlug } from "@/data/aiSolutionsData";
import { useEffect } from "react";

export default function Page() {
  const { slug } = useParams();
  const service = getAIServiceBySlug(slug || "");

  useEffect(() => {
    if (service) {
      document.title = `${service.name} | Fynryx`;
    }
  }, [service]);

  if (!service) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-900 text-xl">Service not found.</p>
      </main>
    );
  }

  return <AISolutionPageTemplate slug={slug || ""} />;
}
