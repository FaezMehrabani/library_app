import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '../app/components/book-list/book-list.component';
import { LibraryListComponent } from '../app/components/library-list/library-list.component';
import { ReturnBookComponent } from '../app/components/return-book/return-book.component';

const routes: Routes = [
  { path: '', component: LibraryListComponent },
  { path: 'bookList/:name/:id' , component : BookListComponent},
  { path: 'returnBook' , component : ReturnBookComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
