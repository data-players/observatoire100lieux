import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MapTiersLieuxComponent } from './cartographie/map-tiers-lieux/map-tiers-lieux.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WelcomeComponent } from './welcome/welcome.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { DetailLieuComponent } from './detail-lieu/detail-lieu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MatCardModule} from '@angular/material/card';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CastnumberPipe} from './castnumber.pipe';
import {CaststringPipe} from './caststring.pipe';
import { FormSideBarTiersLieuxComponent } from './cartographie/form-side-bar-tiers-lieux/form-side-bar-tiers-lieux.component';
import { LeafletMapComponent } from './cartographie/leaflet/leaflet-map/leaflet-map.component';
import {MatInputModule} from '@angular/material/input';
import { FormLieuComponent } from './cartographie/form-lieu/form-lieu.component';
import {QuillModule} from 'ngx-quill';
import { LeafletPopupComponent } from './cartographie/leaflet/leaflet-popup/leaflet-popup.component';
import {MatChipsModule} from '@angular/material/chips';
import { ProcessloginComponent } from './processlogin/processlogin.component';
import { ListLieuComponent } from './cartographie/list-lieu/list-lieu.component';
import { E404Component } from './e404/e404.component';
import {AuthGuard} from './auth.guard';

const routes = [
  //{path: '', pathMatch: 'full', redirectTo: 'welcome'},
  {path: 'processlogin', component: ProcessloginComponent},
  {path: '404', component: E404Component},
  {path: '', component: WelcomeComponent,
    children: [
      {path: 'map', component: CartographieComponent,
        children: [
          {path: '', component: MapTiersLieuxComponent},
          {path: 'add', component: FormLieuComponent, data: {breadcrumb: 'Ajouter un lieu'}, canActivate: [AuthGuard]},
          {path: 'list', component: ListLieuComponent, data: {breadcrumb: 'Liste'}},
          {path: 'edit/:id', component: FormLieuComponent, data: {breadcrumb: {alias: 'Lieu XXX'}}},
          {path: ':id', component: DetailLieuComponent, data: {breadcrumb: {alias: 'Lieu XXX'}}}
        ],
        data: {breadcrumb: 'Carte des 100 lieux nourriciers'}
        },
    ],
    data: {breadcrumb: 'Accueil'}},
]

const modules = {
  toolbar: [
   // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
   // ['blockquote', 'code-block'],

   // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
   // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
   // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
   // [{ 'direction': 'rtl' }],                         // text direction

   // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
   // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
   // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
   // [{ 'font': [] }],
   // [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

   // ['link', 'image', 'video']                         // link and image, video
  ]
};


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
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
    E404Component
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    QuillModule.forRoot({
      modules: {
        toolbar: modules.toolbar
      }
    }),
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
