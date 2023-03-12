import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import {
  NgbDropdownModule,
  NgbModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { ScriptsInitComponent } from './scripts-init/scripts-init.component';
import { AdminRouting } from '../../admin-components-routing';
import { AdminSharedComponent } from './shared.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSharedComponent,
    children: AdminRouting,
  },
];

@NgModule({
  declarations: [
    AdminSharedComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    HeaderMenuComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
  ],
  exports: [
    RouterModule
  ],
})
export class AdminSharedModule {}
