// Clickable example products shown under the input — a one-tap way to feel the
// product before you have a link of your own. A mix of audited premium houses
// (rich, verified verdicts) and one mainstream shop (Zara) to show the read
// works beyond the usual suspects. These are data, not translated.

export interface Example {
  label: string;
  url: string;
}

export const EXAMPLES: Example[] = [
  { label: "Asket", url: "https://www.asket.com/en-pl/mens-t-shirt-white" },
  { label: "SANVT", url: "https://sanvt.com/products/the-perfect-t-shirt-white" },
  {
    label: "Norse Projects",
    url: "https://norseprojects.com/products/norse-standard-heavy-loose-t-shirt-white",
  },
  {
    label: "Zara",
    url: "https://www.zara.com/de/en/boxy-fit-check-shirt-p01820350.html",
  },
];
