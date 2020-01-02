import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateNotesComponent,
    ViewNotesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
