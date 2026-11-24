export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  period: string;
};

export const educationData: EducationItem[] = [
  {
    id: "bca",
    school: "Nepal Mega College",
    degree: "Bachelor in Computer Application (BCA)",
    period: "2019 — 2024",
  },
  {
    id: "plus2",
    school: "Kathmandu Bernhardt College",
    degree: "+2 Management in Computer Science",
    period: "2017 — 2019",
  },
];
