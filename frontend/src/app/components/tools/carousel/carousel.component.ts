import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataProviderService} from '../../../services/data-provider.service';
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {PosterDialogComponent} from '../../ui/poster-dialog/poster-dialog.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() displayLightBox = false;
  @Output() posterEmit: EventEmitter<any> = new EventEmitter<any>();
  posters: any[] = [];

  constructor(private dataService: DataProviderService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.posters = await this.dataService.findAll('posters')
  }

  sendPosterInfo(poster: any) {
    if(this.displayLightBox){
      const dialogRef= this.dialog.open(PosterDialogComponent, {
        maxWidth: '900px',
        data: {
          poster: poster
        }
      })
    }
    this.posterEmit.emit(poster);
  }
}
