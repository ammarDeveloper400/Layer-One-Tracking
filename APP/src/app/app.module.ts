import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { MethodService } from './shared/method.service';
import { ClipboardModule } from 'ngx-clipboard';
import { AdsenseModule } from 'ng2-adsense';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    BrowserAnimationsModule,
    ClipboardModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 5000,
      closeButton: true,
      preventDuplicates: true,
      progressBar: true,
    }),
    AdsenseModule.forRoot({
      adClient: environment.adClientId,
      adSlot: environment.adSlot,
    })
  ],
  providers: [MethodService],
  bootstrap: [AppComponent],
})
export class AppModule {}
