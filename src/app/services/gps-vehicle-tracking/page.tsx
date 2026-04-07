"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "GPS Vehicle Tracking System Development | Fynryx";
  }, []);

  return <ServicePageTemplate slug="gps-vehicle-tracking" />;
}
