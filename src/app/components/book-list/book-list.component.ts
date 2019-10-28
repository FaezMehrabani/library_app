import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Book } from '../../models/book';
import { APIService } from '../../../app/services/apiService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public bookList: Book[];
  public libraryName: string;
  private libraryId: any;
  private bookId: any;
  myForm: FormGroup;
  staticAlertClosed = true;
  memberNotValid = true;
  success = true;
  modalReference: any;

  constructor(private route: ActivatedRoute , private router: Router ,
     private apiService: APIService , private modalService: NgbModal,
     private formBuilder: FormBuilder) {
              this.createForm();
     }
     unsubscribeAll = new Subject();

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.libraryId = params.get('id');
      this.apiService.getAvailableBooks(params.get('id')).subscribe(data => {
        this.libraryName = params.get('name');
        this.bookList = data;
      });
    });
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      memberId: ''
    });
  }

  open(content , book) {
    this.bookId = book.bookId;
    this.modalReference = this.modalService;
    this.modalReference.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     return result;
    }, (reason) => {
      return reason;
    });
  }

  sendSignOutRequest() {
    // tslint:disable-next-line:prefer-const
    var memberId: any;
    memberId = this.myForm.get('memberId').value;
    if ( memberId === '' || memberId <= 0 ) { return; }
     this.apiService.checkMemberIsValid(memberId).subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.apiService.getSignedOutBooksByMemberId(memberId).subscribe(result => {
          result.map(item => {
            if (item.libraryId == this.libraryId && item.bookId == this.bookId ) {
              this.staticAlertClosed = false;
              this.success = true;
            }
          });
          if (this.staticAlertClosed) {
            this.apiService.postSignOutRequest(memberId, this.bookId, this.libraryId).subscribe( ret => {
              console.log(ret);
              this.success = false;
            });
          }
        });
      }
    }, err => {this.memberNotValid = false; this.success = true;  this.staticAlertClosed = true; });
  }




}
