"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Web Development Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="web-development" />;
}
