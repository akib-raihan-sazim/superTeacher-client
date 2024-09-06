export const DaysOfTheWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const DaysOfTheWeekOptions: { value: string; label: string }[] = DaysOfTheWeek.map(
  (day) => ({
    value: day,
    label: day,
  }),
);

export const Subjects: string[] = ["Physics", "Chemistry", "Math", "Biology", "History"];
