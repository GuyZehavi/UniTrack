const getDaysRemainingText = (dueDate: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today!";
  if (diffDays === 1) return "Tomorrow";
  return `In ${diffDays} days`;
};
