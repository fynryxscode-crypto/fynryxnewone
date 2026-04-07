"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Flutter App Development Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="flutter-app-development" />;
}
