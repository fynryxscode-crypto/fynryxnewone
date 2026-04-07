"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "UI/UX Design & Development Services | Fynryx";
  }, []);

  return <ServicePageTemplate slug="ui-ux-development" />;
}
