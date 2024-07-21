import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsPage } from './details/details.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInterceptor } from './utils/custom.interceptor';

@NgModule({
  declarations: [AppComponent, DetailsPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    HttpClientModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
   { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,  multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
