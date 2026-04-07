"use client";

import { useParams } from "react-router-dom";
import { getTechBySlug } from "@/data/technologiesData";
import TechnologyPageTemplate from "@/components/TechnologyPageTemplate";
import { useEffect } from "react";

export default function TechnologyPage() {
  const { slug } = useParams();
  const tech = getTechBySlug(slug || "");

  useEffect(() => {
    if (tech) {
      document.title = `${tech.name} Development Services | Fynryx`;
    }
  }, [tech]);

  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b14]">
        <p className="text-white text-xl">Technology not found.</p>
      </div>
    );
  }

  return <TechnologyPageTemplate tech={tech} />;
}
