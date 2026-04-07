"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "IT Staffing Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="it-staffing" />;
}
