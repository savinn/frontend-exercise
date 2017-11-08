import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item.model';

@Pipe({
    name: 'sortAndSearch',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchTerm: string): any[] {
        if (items) {
            items.sort((a: Item, b: Item) => {
                if (a.item.toLowerCase() < b.item.toLowerCase()) {
                    return -1;
                } else if (a.item.toLowerCase() > b.item.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        if (!items) { return []; }
        if (!searchTerm) { return items; }
        searchTerm = searchTerm.toLowerCase();
        return items.filter(item => {
            return item.item.toLowerCase().includes(searchTerm);
        });
    }
}
