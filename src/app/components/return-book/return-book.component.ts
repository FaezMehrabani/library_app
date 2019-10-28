import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../app/services/apiService';
import { ActivatedRoute , Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent {

  memberId: any;
  bookList: any = [];
  success = true;
  memberNotValid = true;

  constructor(private route: ActivatedRoute , private router: Router ,
    private apiService: APIService) { }

    getMemberBook() {
      this.bookList = [];
      if ( this.memberId === '' || this.memberId <= 0 ) { return; }
     this.apiService.checkMemberIsValid(this.memberId).subscribe(data => {
      if (!isNullOrUndefined(data)) {
      this.apiService.getSignedOutBooksByMemberId(this.memberId , true).subscribe(ret => {
        this.bookList = ret;
      });
    }
  }, err => {this.memberNotValid = false; });
    }

    returnBook(book) {
      this.apiService.returnBook(this.memberId , book.libraryId , book.bookId).subscribe(data => {
        this.getMemberBook();
      });
    }

}
