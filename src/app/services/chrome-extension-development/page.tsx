"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Chrome Extension Development Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="chrome-extension-development" />;
}
