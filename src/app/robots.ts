import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to index behind the login form, and the proxy sends every
      // unauthenticated visitor here — keeping it out avoids a crawl loop.
      disallow: "/auth/login",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
