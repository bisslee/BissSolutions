import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToasterComponent, ToastMessage } from './toaster.component';
import { ToasterService } from './toaster.service';
import { BehaviorSubject } from 'rxjs';

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;
  let toasterService: jasmine.SpyObj<ToasterService>;
  let messagesSubject: BehaviorSubject<ToastMessage[]>;

  beforeEach(async () => {
    messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
    const toasterServiceSpy = jasmine.createSpyObj('ToasterService', ['removeMessage'], {
      messages$: messagesSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [ToasterComponent],
      providers: [
        { provide: ToasterService, useValue: toasterServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    toasterService = TestBed.inject(ToasterService) as jasmine.SpyObj<ToasterService>;
  });

  afterEach(() => {
    messagesSubject.next([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty messages', () => {
    expect(component.messages).toEqual([]);
  });

  it('should subscribe to toaster service messages on init', () => {
    const testMessages: ToastMessage[] = [
      {
        id: '1',
        message: 'Test message',
        type: 'success',
        duration: 5000
      }
    ];

    messagesSubject.next(testMessages);
    component.ngOnInit();

    expect(component.messages).toEqual(testMessages);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should call toaster service removeMessage when removeMessage is called', () => {
    const messageId = 'test-id';

    component.removeMessage(messageId);

    expect(toasterService.removeMessage).toHaveBeenCalledWith(messageId);
  });

  describe('template rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not display toaster container when no messages', () => {
      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.toaster-container');
      expect(container).toBeFalsy();
    });

    it('should display toaster container when messages exist', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.toaster-container');
      expect(container).toBeTruthy();
    });

    it('should display success message with correct styling', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Success message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const toastMessage = compiled.querySelector('.toast-message');
      const icon = compiled.querySelector('.toast-icon i');
      const text = compiled.querySelector('.toast-text');

      expect(toastMessage).toBeTruthy();
      expect(toastMessage.classList.contains('success')).toBeTrue();
      expect(icon.classList.contains('ri-check-line')).toBeTrue();
      expect(text.textContent).toBe('Success message');
    });

    it('should display error message with correct styling', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Error message',
          type: 'error',
          duration: 7000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const toastMessage = compiled.querySelector('.toast-message');
      const icon = compiled.querySelector('.toast-icon i');

      expect(toastMessage.classList.contains('error')).toBeTrue();
      expect(icon.classList.contains('ri-error-warning-line')).toBeTrue();
    });

    it('should display warning message with correct styling', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Warning message',
          type: 'warning',
          duration: 6000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const toastMessage = compiled.querySelector('.toast-message');
      const icon = compiled.querySelector('.toast-icon i');

      expect(toastMessage.classList.contains('warning')).toBeTrue();
      expect(icon.classList.contains('ri-alert-line')).toBeTrue();
    });

    it('should display info message with correct styling', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Info message',
          type: 'info',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const toastMessage = compiled.querySelector('.toast-message');
      const icon = compiled.querySelector('.toast-icon i');

      expect(toastMessage.classList.contains('info')).toBeTrue();
      expect(icon.classList.contains('ri-information-line')).toBeTrue();
    });

    it('should display multiple messages', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'First message',
          type: 'success',
          duration: 5000
        },
        {
          id: '2',
          message: 'Second message',
          type: 'error',
          duration: 7000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const toastMessages = compiled.querySelectorAll('.toast-message');

      expect(toastMessages.length).toBe(2);
      expect(toastMessages[0].classList.contains('success')).toBeTrue();
      expect(toastMessages[1].classList.contains('error')).toBeTrue();
    });

    it('should have close button for each message', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const closeButton = compiled.querySelector('.toast-close');
      const closeIcon = closeButton.querySelector('i');

      expect(closeButton).toBeTruthy();
      expect(closeIcon.classList.contains('ri-close-line')).toBeTrue();
    });

    it('should call removeMessage when close button is clicked', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const closeButton = compiled.querySelector('.toast-close');

      closeButton.click();

      expect(toasterService.removeMessage).toHaveBeenCalledWith('1');
    });

    it('should display message text correctly', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'This is a test message with special characters: @#$%',
          type: 'info',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const text = compiled.querySelector('.toast-text');

      expect(text.textContent).toBe('This is a test message with special characters: @#$%');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have proper button structure for close button', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const closeButton = compiled.querySelector('.toast-close');

      expect(closeButton.tagName).toBe('BUTTON');
      expect(closeButton.type).toBe('button');
    });

    it('should have proper semantic structure', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.toaster-container');
      const toastMessage = compiled.querySelector('.toast-message');

      expect(container).toBeTruthy();
      expect(toastMessage).toBeTruthy();
    });
  });

  describe('responsive design', () => {
    it('should have responsive CSS classes', () => {
      const testMessages: ToastMessage[] = [
        {
          id: '1',
          message: 'Test message',
          type: 'success',
          duration: 5000
        }
      ];

      messagesSubject.next(testMessages);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.toaster-container');
      const toastMessage = compiled.querySelector('.toast-message');

      expect(container).toBeTruthy();
      expect(toastMessage).toBeTruthy();
    });
  });
});
