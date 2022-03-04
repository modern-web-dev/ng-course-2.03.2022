import {Injectable} from '@angular/core';
import {Author, Book, BookDetails} from "../../model";
import {FormBuilder, Validators} from "@angular/forms";
import {minLength} from "./validators/min-length.validator";
import {FormModel} from "../../../shared/form-types";

@Injectable()
export class BookDetailsFormService {

  constructor(private readonly fb: FormBuilder) {
  }

  prepareForm(book: Book) {
    const details = this.prepareDetailsFormGroup(book);
    const author = this.prepareAuthorFormGroup(book);
    const formModel:FormModel<Book>= {
      id: [{value: book.id, disabled: true}],
      author,
      title: [book?.title, [Validators.required, minLength(5)]],
      publishDate: book?.publishDate,
      details
    }
    return this.fb.group(formModel);
  }

  private prepareAuthorFormGroup(book: Book) {
    const authorModel: FormModel<Author> = {
      firstName: [book.author?.firstName, [Validators.required, minLength(5)]],
      lastName: [book.author?.lastName, [Validators.required, minLength(5)]]
    };
    return this.fb.group(authorModel);
  }

  private prepareDetailsFormGroup(book: Book) {
    const detailsModel: FormModel<BookDetails> = {
      pages: book?.details?.pages
    };
    return this.fb.group(detailsModel)
  }
}
