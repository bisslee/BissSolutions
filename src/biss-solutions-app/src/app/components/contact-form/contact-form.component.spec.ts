import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ContactFormComponent, ContactFormData } from './contact-form.component';
import { ContactService, ContactRequest, ContactResponse } from '../../services/contact.service';
import { ToasterService } from '../toaster/toaster.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: jasmine.SpyObj<ContactService>;
  let toasterService: jasmine.SpyObj<ToasterService>;

  const mockContactResponse: ContactResponse = {
    message: 'Mensagem enviada com sucesso!',
    contactId: '12345'
  };

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['sendContact']);
    const toasterServiceSpy = jasmine.createSpyObj('ToasterService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, FormsModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: ToasterService, useValue: toasterServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    toasterService = TestBed.inject(ToasterService) as jasmine.SpyObj<ToasterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('Entre em Contato');
    expect(component.description).toBe('Preencha o formulário abaixo e entraremos em contato em breve.');
    expect(component.isSubmitting).toBeFalse();
    expect(component.showErrors).toBeFalse();
    expect(component.formData).toEqual({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(component.isValidEmail('test@example.com')).toBeTrue();
      expect(component.isValidEmail('user.name@domain.co.uk')).toBeTrue();
      expect(component.isValidEmail('test+tag@example.org')).toBeTrue();
    });

    it('should return false for invalid email addresses', () => {
      expect(component.isValidEmail('invalid-email')).toBeFalse();
      expect(component.isValidEmail('test@')).toBeFalse();
      expect(component.isValidEmail('@example.com')).toBeFalse();
      expect(component.isValidEmail('test@.com')).toBeFalse();
      expect(component.isValidEmail('')).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show errors when form is invalid', () => {
      component.onSubmit();

      expect(component.showErrors).toBeTrue();
      expect(contactService.sendContact).not.toHaveBeenCalled();
      expect(component.isSubmitting).toBeFalse();
    });

    it('should submit form when valid', () => {
      // Set up valid form data
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      contactService.sendContact.and.returnValue(of(mockContactResponse));

      component.onSubmit();

      expect(component.showErrors).toBeTrue();
      expect(component.isSubmitting).toBeTrue();
      expect(contactService.sendContact).toHaveBeenCalledWith({
        fullName: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      });
    });

    it('should handle successful form submission', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      contactService.sendContact.and.returnValue(of(mockContactResponse));
      spyOn(component.formSubmit, 'emit');

      component.onSubmit();

      expect(component.isSubmitting).toBeFalse();
      expect(toasterService.showSuccess).toHaveBeenCalledWith('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      expect(component.formSubmit.emit).toHaveBeenCalledWith(component.formData);
      expect(component.formData).toEqual({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      expect(component.showErrors).toBeFalse();
    });

    it('should handle form submission error', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      const error = new Error('Erro de conexão');
      contactService.sendContact.and.returnValue(throwError(() => error));

      component.onSubmit();

      expect(component.isSubmitting).toBeFalse();
      expect(toasterService.showError).toHaveBeenCalledWith('Erro de conexão');
    });

    it('should handle form submission without company', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: '',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      contactService.sendContact.and.returnValue(of(mockContactResponse));

      component.onSubmit();

      expect(contactService.sendContact).toHaveBeenCalledWith({
        fullName: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: undefined,
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      });
    });
  });

  describe('form validation', () => {
    it('should be valid with all required fields filled', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      expect((component as any).isFormValid()).toBeTrue();
    });

    it('should be invalid with missing name', () => {
      component.formData = {
        name: '',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      expect((component as any).isFormValid()).toBeFalse();
    });

    it('should be invalid with invalid email', () => {
      component.formData = {
        name: 'João Silva',
        email: 'invalid-email',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      expect((component as any).isFormValid()).toBeFalse();
    });

    it('should be invalid with missing phone', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: 'Gostaria de solicitar um orçamento.'
      };

      expect((component as any).isFormValid()).toBeFalse();
    });

    it('should be invalid with missing subject', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: '',
        message: 'Gostaria de solicitar um orçamento.'
      };

      expect((component as any).isFormValid()).toBeFalse();
    });

    it('should be invalid with missing message', () => {
      component.formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        subject: 'orcamento',
        message: ''
      };

      expect((component as any).isFormValid()).toBeFalse();
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display default title and description', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h3').textContent).toContain('Entre em Contato');
      expect(compiled.querySelector('p').textContent).toContain('Preencha o formulário abaixo');
    });

    it('should display all form fields', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#name')).toBeTruthy();
      expect(compiled.querySelector('#email')).toBeTruthy();
      expect(compiled.querySelector('#phone')).toBeTruthy();
      expect(compiled.querySelector('#company')).toBeTruthy();
      expect(compiled.querySelector('#subject')).toBeTruthy();
      expect(compiled.querySelector('#message')).toBeTruthy();
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should show error messages when showErrors is true', () => {
      component.showErrors = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const errorMessages = compiled.querySelectorAll('.error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    it('should disable submit button when submitting', () => {
      component.isSubmitting = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTrue();
      expect(submitButton.textContent).toContain('Enviando...');
    });

    it('should show subject options', () => {
      const compiled = fixture.nativeElement;
      const subjectSelect = compiled.querySelector('#subject');
      const options = subjectSelect.querySelectorAll('option');

      expect(options.length).toBe(6); // 1 empty + 5 subjects
      expect(options[1].textContent).toContain('Solicitar Orçamento');
      expect(options[2].textContent).toContain('Consultoria');
      expect(options[3].textContent).toContain('Proposta de Parceria');
      expect(options[4].textContent).toContain('Suporte Técnico');
      expect(options[5].textContent).toContain('Outro');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have proper form structure', () => {
      const compiled = fixture.nativeElement;
      const form = compiled.querySelector('form');
      expect(form).toBeTruthy();
      expect(form.getAttribute('role')).toBeFalsy(); // Should not override default form role
    });

    it('should have proper labels for form fields', () => {
      const compiled = fixture.nativeElement;
      const labels = compiled.querySelectorAll('label');
      expect(labels.length).toBe(6); // All form fields should have labels
    });

    it('should have required attributes on mandatory fields', () => {
      const compiled = fixture.nativeElement;
      const requiredFields = compiled.querySelectorAll('[required]');
      expect(requiredFields.length).toBe(5); // name, email, phone, subject, message
    });
  });
});
