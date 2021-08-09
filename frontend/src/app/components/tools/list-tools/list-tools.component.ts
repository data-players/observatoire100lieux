import {Component, OnInit} from '@angular/core';
import {DataProviderService} from '../../../services/data-provider.service';
import {PageEvent} from '@angular/material/paginator';
import {FilterType, ToolsService} from '../../../services/tools.service';
import {UiService} from '../../ui/ui.service';

@Component({
  selector: 'app-list-tools',
  templateUrl: './list-tools.component.html',
  styleUrls: ['./list-tools.component.scss']
})
export class ListToolsComponent implements OnInit {

  tools: any[] = [];
  toolsFiltered: Set<any> = new Set()

  length = 500;
  pageIndex = 0;
  pageSize = 10
  showFirstLastButtons = false;

  FilterType = FilterType;

  filters: { [p: string]: string[] } = {};

  constructor(public dataService: DataProviderService, private uiService: UiService, public toolService: ToolsService) { }

  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner();
    this.tools = await this.dataService.findAll('tools');
    this.toolsFiltered = new Set(this.tools);
    this.length = this.tools.length

    this.toolService.toolsFilter.subscribe(filters => {
      this.doFilter(filters)
    })
    this.doFilter({
      pageIndex: [this.pageIndex+'']
    })
    this.uiService.stopSpinner()
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageIndex = event.pageIndex;

    this.doFilter({
      pageIndex: [this.pageIndex+'']
    })
  }

  private async doFilter(filters: {[key:string]: string[]}) {
    this.toolsFiltered = new Set()
    Object.assign(this.filters, this.filters, filters)
    let arrTemps = [];
    if (this.filters && this.filters[FilterType.THEME] && (
      this.filters[FilterType.COST].length !== 0 ||
      this.filters[FilterType.THEME].length !== 0 ||
      this.filters[FilterType.TOOL].length !== 0 ||
      this.filters[FilterType.POPULATION].length !== 0 ||
      this.filters[FilterType.FORMAT].length !== 0)) {
      this.tools.filter(t => {
        return this.filters[FilterType.COST].includes(t['100lieux:cost']) ||
          this.filters[FilterType.TOOL].includes(t['100lieux:aspect']) ||
          this.filters[FilterType.POPULATION].includes(t['100lieux:audience']) ||
          this.filters[FilterType.FORMAT].includes(t['100lieux:format']) ||
          this.filters[FilterType.THEME].includes(t['pair:hasDomain']['pair:label'])
      }).forEach(t => this.toolsFiltered.add(t));
    }else{
      this.toolsFiltered = new Set(this.tools);
    }
    if(this.filters && this.filters[FilterType.TEXT] && this.filters[FilterType.TEXT].length > 0 && this.filters[FilterType.TEXT][0].length !== 0) {
      const tools = Array.from(this.toolsFiltered)
      const result = tools.filter(t => {
       return [FilterType.TEXT][0] ?
          (t as { [key: string]: any })['pair:label'].toLowerCase().search(this.filters[FilterType.TEXT][0].toLowerCase()) !== -1 :
          true
      })
      this.toolsFiltered = new Set(result);
   }
    this.length = this.toolsFiltered.size;

    if(this.toolsFiltered.size >= this.pageSize){
      const tools = Array.from(this.toolsFiltered)
      const result = tools.filter((t, i) =>  i < ((+this.pageIndex+ 1) * this.pageSize)  && i >= ((+this.pageIndex+ 1) * this.pageSize)-this.pageSize )

      this.toolsFiltered = new Set(result);
    }
  }

  removeFilter(c: any, type: FilterType) {
    this.toolService.toolsFilterRemove.emit({
      'type': type,
      'value': c
    })
  }
}
