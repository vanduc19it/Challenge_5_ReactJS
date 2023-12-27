export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(".0", "") + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(".0", "") + "k";
  } else {
    return number.toString();
  }
};

export const formatTime = (timeString: string) => {
  const time: any = new Date(timeString);
  const now: any = new Date();
  const timeDistance = Math.abs(now - time) / 36e5;
  if (timeDistance > 24) {
    const day = time.getDate().toString().padStart(2, "0");
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const year = time.getFullYear();
    return `${day}-${month}-${year}`;
  } else {
    return `${Math.floor(Number(timeDistance))} hour ago`;
  }
};
