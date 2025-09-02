import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService, ContactRequest, ContactResponse } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const mockContactRequest: ContactRequest = {
    fullName: 'João Silva',
    email: 'joao.silva@exemplo.com',
    phone: '(11) 99999-9999',
    company: 'Empresa Teste',
    subject: 'Solicitação de Orçamento',
    message: 'Gostaria de solicitar um orçamento para desenvolvimento de um sistema web.'
  };

  const mockContactResponse: ContactResponse = {
    message: 'Mensagem enviada com sucesso!',
    contactId: '12345'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send contact form successfully', () => {
    service.sendContact(mockContactRequest).subscribe(response => {
      expect(response).toEqual(mockContactResponse);
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockContactRequest);
    req.flush(mockContactResponse);
  });

  it('should handle client-side errors', () => {
    const errorMessage = 'Network error';
    const mockError = new ErrorEvent('Network error', {
      message: errorMessage
    });

    service.sendContact(mockContactRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe(`Erro: ${errorMessage}`);
      }
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.error(mockError);
  });

  it('should handle validation errors (400)', () => {
    const validationError = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      errors: {
        'Email': ['The Email field is not a valid e-mail address.'],
        'FullName': ['The FullName field is required.']
      },
      traceId: '0HMQ8VQJQJQJQ:00000001'
    };

    service.sendContact(mockContactRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Erros de validação: The Email field is not a valid e-mail address., The FullName field is required.');
      }
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.flush(validationError, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle connection errors (0)', () => {
    service.sendContact(mockContactRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.error(new ErrorEvent('Network error'), { status: 0 });
  });

  it('should handle server errors (500)', () => {
    service.sendContact(mockContactRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Erro interno do servidor. Tente novamente mais tarde.');
      }
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle other server errors (404)', () => {
    service.sendContact(mockContactRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Erro ao enviar mensagem. Tente novamente.');
      }
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should handle contact request without company', () => {
    const requestWithoutCompany = { ...mockContactRequest };
    delete requestWithoutCompany.company;

    service.sendContact(requestWithoutCompany).subscribe(response => {
      expect(response).toEqual(mockContactResponse);
    });

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.body).toEqual(requestWithoutCompany);
    req.flush(mockContactResponse);
  });

  it('should use correct API endpoint', () => {
    service.sendContact(mockContactRequest).subscribe();

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.url).toBe('https://mktools.biss.com.br/api/Contact/BissSolutions');
    req.flush(mockContactResponse);
  });

  it('should send POST request with correct headers', () => {
    service.sendContact(mockContactRequest).subscribe();

    const req = httpMock.expectOne('https://mktools.biss.com.br/api/Contact/BissSolutions');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockContactResponse);
  });
});
