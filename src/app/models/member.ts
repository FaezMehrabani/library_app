export class Memeber {
    memberId: number;
    fullName: string;
    postalCode: string;
    bookSignedOuts: BookSignedOut[];
}

export class BookSignedOut {
    libraryBookSid: number;
    memberId: number;
    whenSignedOut: Date;
    whenReturned: Date;
}
