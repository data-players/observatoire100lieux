import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ActivatedRoute, Router} from '@angular/router';
import {Organization} from '../../../model/organization.model';
import {DataProviderService} from '../../../services/data-provider.service';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';
import {UiService} from '../../ui/ui.service';
import {ContactDialogComponent} from '../../ui/contact-dialog/contact-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss']
})
export class DetailLieuComponent implements OnInit {

  organization!: Organization
  callForRemove = false;
  constructor(public router: Router, public dialog: MatDialog,private authService:
    AuthService,private breadcrumbService: BreadcrumbService,
              private activatedRoute: ActivatedRoute, public dataprovider:DataProviderService,
              private uiService: UiService, private snackBar: MatSnackBar) { }
  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner()
    this.breadcrumbService.set('/map/:id','Details');

    this.activatedRoute.params.subscribe( p => {
      this.dataprovider.findOne<Organization>('organizations', p['id']).then(o => {
        this.uiService.stopSpinner()
        this.organization = o;
        this.breadcrumbService.set('/map/:id', this.organization.label);
      })
    })
  }
  async openMailDialog() {
    const dialogRef= this.dialog.open(ContactDialogComponent,{
      data:{
        name: this.organization.label
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'send') {
        this.snackBar.open('Email envoyé!', 'ok',{
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3500
        })
      }
    });
  }

  async deleteOrga() {
    if(this.authService.currentUserValue){
      const dialogRef= this.dialog.open(ConfirmDialogComponent, {
        data: {
          title:  `Vous êtes sur le point de supprimer défnivement ${this.organization.label}`,
          type:  `warn`,
          organization: this.organization
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('result', result)
         if(result === 'validate'){
           dialogRef.close();
           this.dataprovider.delete('organizations', this.organization, this.dataprovider.extractUrlHash(this.organization.id), 'Organization').then( v =>
            this.router.navigateByUrl('/map')
           );

         }
      });
    }else{
      this.callForRemove = true;
      await this.dataprovider.delete('organizations', this.organization, this.dataprovider.extractUrlHash(this.organization.id), 'Organization')
    }
  }
}
