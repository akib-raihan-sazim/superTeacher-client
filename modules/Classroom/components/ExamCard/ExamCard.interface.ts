export interface IExamCardProps {
  exam: {
    id: number;
    title: string;
    instruction: string;
    date: string;
  };
  isPast?: boolean;
}
