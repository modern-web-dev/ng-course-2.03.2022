import {BookDetailsComponent} from './book-details.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Book} from '../../model';

describe('BookDetailsComponent', function () {
  let testBook: Book;

  beforeEach(function () {
    testBook = {
      id: 0,
      author: 'Test Author',
      title: 'Test Title'
    };
  })


  describe('(class)', function () {
    it('fires an event on save', function () {
      // 1. given
      const eventStub: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            return selector === '#author' ? {value: 'Current Author'} : {value: 'Current Title'};
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe(updatedBook => {
        // 3. then
        expect(eventStub.preventDefault).toHaveBeenCalled();
        expect(updatedBook).toBeDefined();
        expect(updatedBook.author).toBe('Current Author');
        expect(updatedBook.title).toBe('Current Title');
      })
      // 2. when
      component.save(eventStub);
    })
  });

  describe('(DOM)', function () {
    let componentFixture: ComponentFixture<BookDetailsComponent>,
      component: BookDetailsComponent,
      element: HTMLElement;

    beforeEach(function () {
      componentFixture = TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).createComponent(BookDetailsComponent);
      component = componentFixture.componentInstance;
      element = componentFixture.nativeElement as HTMLElement;
    })

    it('populates values from book to inputs', function () {
      // given
      component.book = testBook;
      // when
      componentFixture.detectChanges();
      // then
      const element = componentFixture.nativeElement as HTMLElement;
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      expect(authorInput?.value).toBe(testBook.author);
      const titleInput = element.querySelector<HTMLInputElement>('#title');
      expect(titleInput?.value).toBe(testBook.title);
    })

    it('fires an event on button click', function () {
      //
    });
  });
});
