import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../services/contact.service';
import { ToasterService } from '../toaster/toaster.service';
import { ContactRequest, ContactResponse } from '../../services/contact.service';

describe('ContactFormComponent Integration Tests', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: ContactService;
  let toasterService: ToasterService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, FormsModule, HttpClientTestingModule],
      providers: [ContactService, ToasterService]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    toasterService = TestBed.inject(ToasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should integrate form submission with API and toaster service', () => {
    fixture.detectChanges();

    // Set up form data
    const formData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };

    // Fill form
    component.formData = formData;
    fixture.detectChanges();

    // Spy on toaster service methods
    spyOn(toasterService, 'showSuccess');
    spyOn(toasterService, 'showError');

    // Submit form
    component.onSubmit();

    // Verify API call
    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      fullName: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    });

    // Mock successful response
    const mockResponse: ContactResponse = {
      message: 'Mensagem enviada com sucesso!',
      contactId: '12345'
    };
    req.flush(mockResponse);

    // Verify toaster service was called with success message
    expect(toasterService.showSuccess).toHaveBeenCalledWith('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    expect(toasterService.showError).not.toHaveBeenCalled();

    // Verify form was reset
    expect(component.formData).toEqual({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
    expect(component.showErrors).toBeFalse();
    expect(component.isSubmitting).toBeFalse();
  });

  it('should integrate error handling with API and toaster service', () => {
    fixture.detectChanges();

    // Set up form data
    const formData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };

    // Fill form
    component.formData = formData;
    fixture.detectChanges();

    // Spy on toaster service methods
    spyOn(toasterService, 'showSuccess');
    spyOn(toasterService, 'showError');

    // Submit form
    component.onSubmit();

    // Verify API call
    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');

    // Mock error response
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });

    // Verify toaster service was called with error message
    expect(toasterService.showError).toHaveBeenCalledWith('Erro interno do servidor. Tente novamente mais tarde.');
    expect(toasterService.showSuccess).not.toHaveBeenCalled();

    // Verify form state after error
    expect(component.isSubmitting).toBeFalse();
    expect(component.formData).toEqual(formData); // Form should not be reset on error
  });

  it('should integrate form validation with UI feedback', () => {
    fixture.detectChanges();

    // Try to submit empty form
    component.onSubmit();

    // Verify validation errors are shown
    expect(component.showErrors).toBeTrue();
    expect(component.isSubmitting).toBeFalse();

    // Verify no API call was made
    httpMock.expectNone('https://mktools.biss.com.br/api/Contact/BissSolutions');

    // Check that error messages are displayed in template
    const compiled = fixture.nativeElement;
    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBeGreaterThan(0);

    // Fill form with invalid email
    component.formData = {
      name: 'João Silva',
      email: 'invalid-email',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };
    fixture.detectChanges();

    component.onSubmit();

    // Verify validation still fails
    expect(component.showErrors).toBeTrue();
    expect(component.isSubmitting).toBeFalse();
    httpMock.expectNone('https://mktools.biss.com.br/api/Contact/BissSolutions');
  });

  it('should integrate form submission without company field', () => {
    fixture.detectChanges();

    // Set up form data without company
    const formData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: '',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };

    // Fill form
    component.formData = formData;
    fixture.detectChanges();

    // Submit form
    component.onSubmit();

    // Verify API call with undefined company
    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.body).toEqual({
      fullName: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: undefined,
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    });

    // Mock successful response
    const mockResponse: ContactResponse = {
      message: 'Mensagem enviada com sucesso!',
      contactId: '12345'
    };
    req.flush(mockResponse);

    // Verify form was reset
    expect(component.formData.company).toBe('');
  });

  it('should integrate loading state with UI', () => {
    fixture.detectChanges();

    // Set up valid form data
    const formData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };

    component.formData = formData;
    fixture.detectChanges();

    // Submit form
    component.onSubmit();

    // Verify loading state
    expect(component.isSubmitting).toBeTrue();

    // Check UI shows loading state
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
    expect(submitButton.textContent).toContain('Enviando...');

    // Mock response
    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    const mockResponse: ContactResponse = {
      message: 'Mensagem enviada com sucesso!',
      contactId: '12345'
    };
    req.flush(mockResponse);

    // Verify loading state is cleared
    expect(component.isSubmitting).toBeFalse();
  });

  it('should integrate form output event emission', () => {
    fixture.detectChanges();

    // Set up valid form data
    const formData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      subject: 'orcamento',
      message: 'Gostaria de solicitar um orçamento.'
    };

    component.formData = formData;
    fixture.detectChanges();

    // Spy on form submit event
    spyOn(component.formSubmit, 'emit');

    // Submit form
    component.onSubmit();

    // Mock successful response
    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    const mockResponse: ContactResponse = {
      message: 'Mensagem enviada com sucesso!',
      contactId: '12345'
    };
    req.flush(mockResponse);

    // Verify event was emitted
    expect(component.formSubmit.emit).toHaveBeenCalledWith(formData);
  });

  it('should integrate with different subject options', () => {
    fixture.detectChanges();

    const subjects = ['orcamento', 'consultoria', 'parceria', 'suporte', 'outro'];

    subjects.forEach(subject => {
      // Reset form
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: subject,
        message: 'Test message'
      };

      // Submit form
      component.onSubmit();

      // Verify API call with correct subject
      const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
      expect(req.request.body.subject).toBe(subject);

      // Mock successful response
      const mockResponse: ContactResponse = {
        message: 'Mensagem enviada com sucesso!',
        contactId: '12345'
      };
      req.flush(mockResponse);
    });
  });
});
