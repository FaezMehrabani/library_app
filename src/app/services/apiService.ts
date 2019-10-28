import { isNullOrUndefined } from 'util';
import { Injectable, Inject } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, EMPTY, throwError, from, forkJoin } from 'rxjs';
import { map, filter, scan , catchError , switchMap  , tap , flatMap, mergeMap, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';


import { Library } from '../models/library';
import { Book } from '../models/book';
import { Memeber } from '../models/member';

@Injectable({
    providedIn: 'root'
  })

export class APIService {

    apiURL = 'https://aka-library-api.azurewebsites.net/api';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

    constructor(private httpClient: HttpClient) {
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }

    public getLibraries() {
        return this.httpClient.get<Library[]>(`${this.apiURL}/libraries`);
    }

    public getAllBooks(libId: any) {
        return this.httpClient.get<Book[]>(`${this.apiURL}/libraries/${libId}/books`);
    }

    public getAvailableBooks(libId: any) {
        return this.httpClient.get<Book[]>(`${this.apiURL}/libraries/${libId}/books/available`);
    }

    public checkMemberIsValid(memberId: any): Observable<any> {
        return this.httpClient.get(`${this.apiURL}/members/${memberId}`).pipe(
        catchError(this.handleError));
    }

    public getSignedOutBooksByMemberId(memberId: any , needMap?: boolean) {
        return this.httpClient.get<any>(`${this.apiURL}/members/${memberId}/books/signedout`);
    }

    public postSignOutRequest(memberId: any, bookId: any , libraryId: any): any {
            return this.httpClient.post(`${this.apiURL}/libraries/${libraryId}/books/${bookId}/signout/${memberId}`
            , null, this.httpOptions);
    }

    public returnBook(memberId: any , libraryId: any, bookId: any) {
    // tslint:disable-next-line:radix
    const lbsid = (parseInt(libraryId) + parseInt(bookId)).toString();
        return this.httpClient.put(`${this.apiURL}/libraries/${libraryId}/books/${bookId}/return/${memberId}?lbsid=${lbsid}`
            , null , this.httpOptions);
    }

}
