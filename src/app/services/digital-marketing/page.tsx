"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Digital Marketing Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="digital-marketing" />;
}
