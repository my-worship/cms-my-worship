import { format } from "date-fns";

export class DateHelper {
  public toFormatDate(date: Date | string, formatTime: string): string {
    return format(new Date(date.toString()), formatTime);
  }
}
