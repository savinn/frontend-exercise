import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortAndSearch'
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchTerm: string): any[] {
        if (items) {
            items.sort((a: string, b: string) => {
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                } else if (a.toLowerCase() > b.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return items;
        }
        if (!items) return [];
        if (!searchTerm) return items;
        searchTerm = searchTerm.toLowerCase();
        return items.filter(item => {
            return item.toLowerCase().includes(searchTerm);
        });
    }
}