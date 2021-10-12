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
    window.open('https://drive.google.com/file/d/1r-Vnpf9BBMkWJt-vZBjiMEMRZfdIjrfl/view');
  }
}
