import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/ui/header/header.component';
import { MapTiersLieuxComponent } from './components/cartographie/map-tiers-lieux/map-tiers-lieux.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './components/ui/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CartographieComponent } from './components/cartographie/cartographie.component';
import { DetailLieuComponent } from './components/cartographie/detail-lieu/detail-lieu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BreadcrumbComponent } from './components/ui/breadcrumb/breadcrumb.component';
import {MatCardModule} from '@angular/material/card';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CastnumberPipe} from './castnumber.pipe';
import {CaststringPipe} from './caststring.pipe';
import { FormSideBarTiersLieuxComponent } from './components/cartographie/form-side-bar-tiers-lieux/form-side-bar-tiers-lieux.component';
import { LeafletMapComponent } from './components/cartographie/leaflet/leaflet-map/leaflet-map.component';
import {MatInputModule} from '@angular/material/input';
import { FormLieuComponent } from './components/cartographie/form-lieu/form-lieu.component';
import {QuillModule} from 'ngx-quill';
import { LeafletPopupComponent } from './components/cartographie/leaflet/leaflet-popup/leaflet-popup.component';
import {MatChipsModule} from '@angular/material/chips';
import { ProcessloginComponent } from './components/login-box/processlogin/processlogin.component';
import { ListLieuComponent } from './components/cartographie/list-lieu/list-lieu.component';
import { E404Component } from './components/e404/e404.component';
import {AuthGuard} from './auth.guard';
import { PendingPlacesComponent } from './components/admin/pending-places/pending-places.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { MainwrapperComponent } from './components/mainwrapper/mainwrapper.component';
import { ListLieuFilterComponent } from './components/cartographie/list-lieu-filter/list-lieu-filter.component';
import { ConfirmDialogComponent } from './components/ui/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormToolComponent} from './components/tools/form-tool/form-tool.component';
import { TagsManagmentComponent } from './components/admin/tags-managment/tags-managment.component';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ListToolsFilterComponent } from './components/tools/list-tools-filter/list-tools-filter.component';
import { ListToolsComponent } from './components/tools/list-tools/list-tools.component';
import { FormSideBarListToolsComponent } from './components/tools/form-side-bar-list-tools/form-side-bar-list-tools.component';
import { NocarriagePipe } from './nocarriage.pipe';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarouselComponent } from './components/tools/carousel/carousel.component';
import { FormPostersComponent } from './components/admin/form-posters/form-posters.component';
import { PosterDialogComponent } from './components/ui/poster-dialog/poster-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DetailToolComponent } from './components/tools/detail-tool/detail-tool.component';
import {RoutingModule} from './routing.module';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { ContactDialogComponent } from './components/ui/contact-dialog/contact-dialog.component';
import { AccueilComponent } from './components/admin/accueil/accueil.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import { MentionsComponent } from './components/ui/mentions/mentions.component';
import { ListByTagComponent } from './components/tools/list-by-tag/list-by-tag.component';


const modules = {
  toolbar: [
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean'],
  ]
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapTiersLieuxComponent,
    FooterComponent,
    WelcomeComponent,
    CartographieComponent,
    DetailLieuComponent,
    BreadcrumbComponent,
    CaststringPipe,
    CastnumberPipe,
    FormSideBarTiersLieuxComponent,
    LeafletMapComponent,
    FormLieuComponent,
    LeafletPopupComponent,
    ProcessloginComponent,
    ListLieuComponent,
    E404Component,
    FormToolComponent,
    PendingPlacesComponent,
    LoginBoxComponent,
    MainwrapperComponent,
    ListLieuFilterComponent,
    ConfirmDialogComponent,
    TagsManagmentComponent,
    ListToolsFilterComponent,
    ListToolsComponent,
    FormSideBarListToolsComponent,
    NocarriagePipe,
    CarouselComponent,
    FormPostersComponent,
    PosterDialogComponent,
    DetailToolComponent,
    PartenairesComponent,
    ContactDialogComponent,
    AccueilComponent,
    MentionsComponent,
    ListByTagComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatSelectModule,
    QuillModule.forRoot({
      modules: {
        toolbar: modules.toolbar
      }
    }),
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    IvyCarouselModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
