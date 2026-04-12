import { Gender } from "../types/gender";

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const getHonorific = (gender: Gender, name: string) => {
  return (
    (gender === Gender.MALE
      ? "Sr."
      : gender === Gender.FEMALE
        ? "Sra."
        : "Sr(a).") +
    " " +
    name
  );
};
