import { Component, OnInit } from '@angular/core';
import {DataProviderService} from '../../../services/data-provider.service';
import {UiService} from '../../ui/ui.service';
import {ToolsService} from '../../../services/tools.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-by-tag',
  templateUrl: './list-by-tag.component.html',
  styleUrls: ['./list-by-tag.component.scss']
})
export class ListByTagComponent implements OnInit {


  tools: any[] = [];
  toolsFiltered: Set<any> = new Set()

  length = 500;
  pageIndex = 0;
  pageSize = 10
  showFirstLastButtons = false;


  filters: { [p: string]: string[] } = {};
  currentTag = "";


  constructor(public dataService: DataProviderService, private activatedRoute:ActivatedRoute, private uiService: UiService, public toolService: ToolsService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParamMap.subscribe( async p=> {
      this.uiService.showSpinner();
      this.tools = await this.dataService.findAll('tools');
//      this.toolsFiltered = new Set(this.tools.filter( s => s.tag));
      this.length = this.tools.length

      this.doFilter({
        pageIndex: [this.pageIndex+'']
      })
      this.uiService.stopSpinner()
    })


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

    this.length = this.toolsFiltered.size;

    if(this.toolsFiltered.size >= this.pageSize){
      const tools = Array.from(this.toolsFiltered)
      const result = tools.filter((t, i) =>  i < ((+this.pageIndex+ 1) * this.pageSize)  && i >= ((+this.pageIndex+ 1) * this.pageSize)-this.pageSize )

      this.toolsFiltered = new Set(result);
    }
  }

}
