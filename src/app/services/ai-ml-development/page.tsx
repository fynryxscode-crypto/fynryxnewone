"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "AI & ML Development Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="ai-ml-development" />;
}
