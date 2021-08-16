import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataProviderService} from '../../../services/data-provider.service';

interface ContactDialogData {
  name: string,
  email: string,
  content: string
}
@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactDialogData,
    private fb: FormBuilder,
    private dataProvider: DataProviderService){}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      title: 'Informations',
      email: ['', [Validators.email, Validators.required]],
      content: ['', [Validators.required, Validators.min(10)]]
    })
  }
  close(){
    this.dialogRef.close()
  }
  sendEmail(){
    this.submitted = true
    if(this.contactForm.valid){
      this.dialogRef.close('send')
      this.dataProvider.createReq('_mailer/contact-user', this.contactForm.value, 'mailer')
    }
  }
}
