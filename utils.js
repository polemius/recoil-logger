const formatNumber = (number) => {
    if (number <= 9) {
        return `0${number}`
    } 

    return number
}

export const formatTime = (time) => {
  const h = formatNumber(time.getHours())
  const m = formatNumber(time.getMinutes())
  const s = formatNumber(time.getSeconds())
  const ms = formatNumber(time.getMilliseconds())
  return `${h}:${m}:${s}.${ms}`;
};
