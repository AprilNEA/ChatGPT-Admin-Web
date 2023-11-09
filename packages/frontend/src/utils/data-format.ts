export function DateFormat(time: string | number): string {
  const date = new Date(time);

  const day: string = ('0' + date.getDate()).slice(-2);
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const year: number = date.getFullYear();

  const hours: string = ('0' + date.getHours()).slice(-2);
  const minutes: string = ('0' + date.getMinutes()).slice(-2);
  const seconds: string = ('0' + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function DateFormat2(time: string | number | Date): string {
  const date = new Date(time);

  const day: string = ('0' + date.getDate()).slice(-2);
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const year: number = date.getFullYear();
  const hours: string = ('0' + date.getHours()).slice(-2);
  const minutes: string = ('0' + date.getMinutes()).slice(-2);
  return `${month}-${day} ${hours}:${minutes}`;
}
