import { EEducationLevel } from "@/shared/typedefs";

export const CLASS_OPTIONS_SCHOOL = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
  { value: "4", label: "Class 4" },
  { value: "5", label: "Class 5" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
];

export const CLASS_OPTIONS_COLLEGE = [
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

export const DEGREE_OPTIONS = [
  { value: "computerScience", label: "Computer Science" },
  { value: "businessAdministration", label: "Business Administration" },
  { value: "engineering", label: "Engineering" },
  { value: "medicine", label: "Medicine" },
];

export const EDUCATION_LEVEL_OPTIONS = [
  { value: EEducationLevel.SCHOOL, label: "School" },
  { value: EEducationLevel.COLLEGE, label: "College" },
  { value: EEducationLevel.UNIVERSITY, label: "University" },
];

export const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];
