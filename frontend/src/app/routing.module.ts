import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessloginComponent} from './components/login-box/processlogin/processlogin.component';
import {E404Component} from './components/e404/e404.component';
import {MainwrapperComponent} from './components/mainwrapper/mainwrapper.component';
import {CartographieComponent} from './components/cartographie/cartographie.component';
import {MapTiersLieuxComponent} from './components/cartographie/map-tiers-lieux/map-tiers-lieux.component';
import {ListLieuFilterComponent} from './components/cartographie/list-lieu-filter/list-lieu-filter.component';
import {FormLieuComponent} from './components/cartographie/form-lieu/form-lieu.component';
import {PendingPlacesComponent} from './components/admin/pending-places/pending-places.component';
import {DetailLieuComponent} from './components/cartographie/detail-lieu/detail-lieu.component';
import {ListToolsFilterComponent} from './components/tools/list-tools-filter/list-tools-filter.component';
import {FormToolComponent} from './components/tools/form-tool/form-tool.component';
import {DetailToolComponent} from './components/tools/detail-tool/detail-tool.component';
import {TagsManagmentComponent} from './components/admin/tags-managment/tags-managment.component';
import {FormPostersComponent} from './components/admin/form-posters/form-posters.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {RouterModule} from '@angular/router';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {PartenairesComponent} from './components/partenaires/partenaires.component';
import {AccueilComponent} from './components/admin/accueil/accueil.component';
import {AuthGuard} from './auth.guard';
import {MentionsComponent} from './components/ui/mentions/mentions.component';


const routes = [
  {path: 'processlogin', component: ProcessloginComponent},
  {path: '', component: MainwrapperComponent,
    children: [
      {path: 'partners', component: PartenairesComponent,data: {breadcrumb: 'Partenaires'  }},
      {path: 'mentions', component: MentionsComponent ,data: {breadcrumb: 'Mentions légales'  }},
      {path: 'map', component: CartographieComponent,
        children: [
          {path: '', component: MapTiersLieuxComponent},
          {path: 'list', component: ListLieuFilterComponent, data: {breadcrumb: 'Liste'}},
          {path: 'add', component: FormLieuComponent, data: {breadcrumb: 'Ajouter un lieu'}},
          {path: 'edit/:id', component: FormLieuComponent, data: {breadcrumb: {alias: 'Lieu XXX'}}},
          {path: ':id', component: DetailLieuComponent, data: {breadcrumb: {alias: 'Lieu XXX'}}}
        ],
        data: {breadcrumb: 'Carte des 100 lieux nourriciers'}
      },
      {path: 'tools', component: CartographieComponent,
        children: [
          {path: '', component: ListToolsFilterComponent},
          {path: 'add', component: FormToolComponent, data: {breadcrumb: 'Ajouter un outil'}},
          {path: 'edit/:id', component: FormToolComponent, data: {breadcrumb: {alias: 'Lieu XXX'}}},
          {path: ':id', component: DetailToolComponent, data: {breadcrumb: {alias: 'Outil XXX'}}}
        ],
        data: {breadcrumb: 'Outils'}
      },
      {path: 'admin', component: CartographieComponent, canActivate:[AuthGuard],
        children: [
          {path: '', redirectTo: '/admin/accueil', pathMatch: 'full'},
          {path: 'accueil', component: AccueilComponent, data: {breadcrumb: 'Accueil'}},
          {path: 'pending', component: PendingPlacesComponent, data: {breadcrumb: 'Valider'}},
          {path: 'tags', component: TagsManagmentComponent, data: {breadcrumb: 'Ajouter un tag'}},
          {path: 'posters/add', component: FormPostersComponent, data: {breadcrumb: 'Ajouter un poster'}},
        ],
        data: {breadcrumb: 'Admin'}
      },
      {path: '', component: WelcomeComponent },
    ],
    data: {breadcrumb: 'Accueil'}},
    {path: '**', component: E404Component},
]

@NgModule({
  declarations: [],
  imports: [
    BreadcrumbModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, BreadcrumbModule]
})
export class RoutingModule { }
