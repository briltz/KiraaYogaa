import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { PrivateClassesComponent } from './private-classes/private-classes.component';
import { GroupClassesComponent } from './group-classes/group-classes.component';
import { SmallCalendarComponent } from './small-calendar/small-calendar.component'; 
import { DatePipe } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FaqComponent,
    PrivateClassesComponent,
    GroupClassesComponent,
    SmallCalendarComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
