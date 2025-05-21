import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysSince',
})
export class DaysSincePipe implements PipeTransform {
  transform(value: string | Date): number {
    if (!value) {
      return 0;
    }

    const createdDate = new Date(value);
    const today = new Date();
    const timeDiff = today.getTime() - createdDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  }
}
