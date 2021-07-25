import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataProviderService} from '../../../services/data-provider.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tags-managment',
  templateUrl: './tags-managment.component.html',
  styleUrls: ['./tags-managment.component.scss']
})
export class TagsManagmentComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  form!: FormGroup;
  tags: { [key: string]: string}[] = []
  editedTag!: { [key: string] : string};
  constructor(private dataService: DataProviderService, public dialog: MatDialog, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.tags = await this.dataService.findAll('themes')
    this.form = this.fb.group({
      '@id': [],
      'pair:label': [, Validators.required]
    })
  }

  async submit(): Promise<void> {
    if(this.form.valid){
      const values = this.form.value
      if(values['@id']) {
        await this.dataService.updateReq('themes', values, 'Theme', this.dataService.extractUrlHash(values['@id']))
      }else {
        await this.dataService.createReq('themes', values, 'Theme')
      }
      this.form.reset()
      this.formDirective.resetForm()
      this.dataService.findAll<any>('themes').then( tags => this.tags = tags)
    }
  }

  async delete(): Promise<void> {
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      data: {
        type: 'warn',
        title: `Vous êtes sur le point de supprimer le tag ${this.editedTag['label']}`,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'validate'){
        dialogRef.close();
        this.dataService.deleteReq('themes', this.dataService.extractUrlHash(this.editedTag['@id'])).then( v =>
           this.dataService.findAll<any>('themes').then( tags => this.tags = tags)
        );
      }
    });
  }

  edit(tag: { [p: string]: string }) {
    this.editedTag = tag
    this.form.controls['@id'].setValue(tag['@id']);
    this.form.controls['pair:label'].setValue(tag['pair:label']);

  }
}
