import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../app/services/apiService';
import { Library } from '../../models/library';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {

  public libList: Library[];
  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
    this.apiService.getLibraries().subscribe((data) => {
      console.log(data);
      this.libList = data;
    });
  }

  goToBookList(id: any) {
    this.router.navigate(['/bookList', id]);
  }

}
