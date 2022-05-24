import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface PosterDialogData {
  poster: any;
}

@Component({
  selector: 'app-poster-dialog',
  templateUrl: './poster-dialog.component.html',
  styleUrls: ['./poster-dialog.component.scss']
})
export class PosterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PosterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PosterDialogData){}

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

  download() {
    window.open('https://drive.google.com/file/d/1Pn0HVhBy_QXt3v827_bz4omdFmYy0F7J/view?usp=sharing');
  }

  download2() {
    window.open('https://drive.google.com/file/d/1n8KRI8FByU2ukIriZ_qTy2TA7lrwUKYl/view?usp=sharing');
  }
}
