import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APIService } from '../app/services/apiService';
import { BookListComponent } from './components/book-list/book-list.component';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { ReturnBookComponent } from './components/return-book/return-book.component'


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    LibraryListComponent,
    ReturnBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
