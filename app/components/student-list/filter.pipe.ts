// This pipe filters an array of student objects based on a search query.
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], query: string): any[] {
    if (!query) {
      return items;
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(query.toLowerCase()) ||
      item.class.toLowerCase().includes(query.toLowerCase())
    );
  }
}
