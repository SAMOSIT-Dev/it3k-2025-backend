export function libs(): string {
  return 'libs';
}


export const formatTime = (start?: string, end?: string): string => {
  const format = (time?: string) => {
    if (!time) return "Invalid Time";
    const [hours, minutes] = time.split(":");
    return `${hours}.${minutes}`;
  };

  const formattedTime = `${format(start)} - ${format(end)}`;
  return formattedTime;
};