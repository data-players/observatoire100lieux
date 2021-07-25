import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataProviderService} from '../../../services/data-provider.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../../ui/ui.service';

@Component({
  selector: 'app-detail-tool',
  templateUrl: './detail-tool.component.html',
  styleUrls: ['./detail-tool.component.scss']
})
export class DetailToolComponent implements OnInit {
  public callForRemove = false

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              public dataprovider: DataProviderService, private authService: AuthService,
              private router: Router, public dialog: MatDialog, private uiService: UiService) { }

  tool:any;

  ngOnInit(): void {
    this.uiService.showSpinner()
    this.breadcrumbService.set('/tools/:id','Details');

    this.activatedRoute.params.subscribe( p => {
      this.dataprovider.findOne<any>('tools', p['id']).then(t => {
      this.uiService.stopSpinner()
        this.tool = t;
        if( this.tool['pair:hasTopic'] && !Array.isArray(this.tool['pair:hasTopic'])){
          this.tool['pair:hasTopic'] = [this.tool['pair:hasTopic']]
        }
        this.breadcrumbService.set('/tools/:id', t['pair:label']);
      })
    })
  }

  async deleteTool() {
    if(this.authService.currentUserValue){
      const dialogRef= this.dialog.open(ConfirmDialogComponent, {
        data: {
          title:  `Vous êtes sur le point de supprimer défnivement ${this.tool["pair:label"]}`,
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result === 'delete'){
          dialogRef.close();
          this.dataprovider.delete('tools', this.tool, this.dataprovider.extractUrlHash(this.tool["@id"]), 'Resource').then( v =>
            this.router.navigateByUrl('/tools')
          );
        }
      });
    }else{
      this.callForRemove = true;
      await this.dataprovider.delete('tools', this.tool, this.dataprovider.extractUrlHash(this.tool["@id"]), 'Resource')
    }
  }

}
