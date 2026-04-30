/**
 * SEO helpers — single source of truth for site URL, business info, and
 * structured-data builders. Edit BUSINESS to update everything site-wide.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://metadim.ua";

export const BUSINESS = {
  legalName: "MetaDim",
  brandName: "MetaDim",
  foundedYear: 1999,
  description:
    "MetaDim — преміальна будівельна компанія з 1999 року. Житлові, комерційні та промислові об'єкти у Києві та по Україні. Власна техніка, BIM-проектування, фіксована ціна, гарантія 10 років.",
  shortDescription:
    "Преміальне будівництво з гарантією 10 років. 340+ об'єктів у Києві та по Україні.",
  phone: "+380442471839",
  phoneDisplay: "+380 44 247 18 39",
  email: "info@metadim.ua",
  address: {
    streetAddress: "вул. Хрещатик, 22, оф. 14",
    addressLocality: "Київ",
    addressRegion: "м. Київ",
    postalCode: "01001",
    addressCountry: "UA",
  },
  geo: {
    // Approximate Khreshchatyk / city centre — update with exact office coords
    latitude: 50.4501,
    longitude: 30.5234,
  },
  hours: "Mo-Fr 09:00-18:00",
  hoursDisplay: "Пн–Пт 9:00–18:00",
  areaServed: ["Київ", "Київська область", "Україна"],
  sameAs: [] as string[], // fill with real social URLs once available
};

export type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: BUSINESS.description,
    foundingDate: String(BUSINESS.foundedYear),
    sameAs: BUSINESS.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "sales",
        availableLanguage: ["uk", "Ukrainian"],
        areaServed: "UA",
      },
    ],
  };
}

export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.legalName,
    image: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "$$$",
    description: BUSINESS.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
    sameAs: BUSINESS.sameAs,
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.brandName,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "uk-UA",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function projectSchema(p: {
  slug: string;
  name: string;
  year: number;
  description: string | null;
  img: string;
  category: string;
  location: string | null;
  area: string | null;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/projects/${p.slug}#project`,
    url: `${SITE_URL}/projects/${p.slug}`,
    name: p.name,
    description:
      p.description ??
      `${p.category} проект ${p.year} року${p.location ? `, ${p.location}` : ""}.`,
    image: p.img.startsWith("http") ? p.img : `${SITE_URL}${p.img}`,
    dateCreated: String(p.year),
    creator: { "@id": `${SITE_URL}/#organization` },
    locationCreated: p.location
      ? { "@type": "Place", name: p.location }
      : undefined,
    genre: p.category,
    ...(p.area ? { size: p.area } : {}),
  };
}

export function fullProjectSchema(p: {
  slug: string;
  name: string;
  year: number;
  description: string | null;
  img: string;
  category: string;
  location: string | null;
  area: string | null;
  duration: string | null;
  facts: string[];
  tags: string[];
}): JsonLd {
  const base = projectSchema(p) as Record<string, unknown>;
  return {
    ...base,
    additionalProperty: [
      ...(p.area
        ? [
            {
              "@type": "PropertyValue",
              name: "Площа",
              value: p.area,
            },
          ]
        : []),
      ...(p.duration
        ? [
            {
              "@type": "PropertyValue",
              name: "Термін реалізації",
              value: p.duration,
            },
          ]
        : []),
      ...(p.facts ?? []).map((fact) => ({
        "@type": "PropertyValue",
        name: "Особливість",
        value: fact,
      })),
    ],
    keywords: [...(p.tags ?? []), p.category, "MetaDim", "будівництво"].join(", "),
    isPartOf: { "@id": `${SITE_URL}/works#catalog` },
  };
}

export function serviceSchema(s: {
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[];
  intro: string | null;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    url: `${SITE_URL}/services/${s.slug}`,
    name: s.title,
    description: s.intro ?? s.description,
    serviceType: s.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
    ...(s.icon ? { image: s.icon.startsWith("http") ? s.icon : `${SITE_URL}${s.icon}` } : {}),
    ...(s.features?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Що входить у послугу «${s.title}»`,
            itemListElement: s.features.map((f, i) => ({
              "@type": "Offer",
              position: i + 1,
              itemOffered: { "@type": "Service", name: f },
            })),
          },
        }
      : {}),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

export function projectsItemListSchema(
  projects: {
    slug: string;
    name: string;
    year: number;
    description: string | null;
    img: string;
    category: string;
    location: string | null;
    area: string | null;
  }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: projectSchema(p),
    })),
  };
}
