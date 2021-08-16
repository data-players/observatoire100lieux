import { Component, OnInit } from '@angular/core';
import {ContactDialogComponent} from '../contact-dialog/contact-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DataProviderService} from '../../../services/data-provider.service';
import {UiService} from '../ui.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog, public dataprovider:DataProviderService,
             private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  async openMailDialog() {
    const dialogRef= this.dialog.open(ContactDialogComponent,{
      data:{
        name: '100 Lieux Nourriciers'
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
}
