import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsComponent, Client } from './clients.component';
import { CLIENTS_DATA } from './clients.config';

describe('ClientsComponent Integration Tests', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
  });

  it('should integrate with default clients data', () => {
    fixture.detectChanges();

    // Verify component uses default data
    expect(component.clients).toEqual(CLIENTS_DATA);
    expect(component.title).toBe('Nossos Clientes');
    expect(component.description).toBe('Empresas que confiam em nossas soluções e serviços');

    // Verify template renders with default data
    const compiled = fixture.nativeElement;
    const clientItems = compiled.querySelectorAll('.client-item');
    expect(clientItems.length).toBe(CLIENTS_DATA.length);

    // Verify each client is rendered correctly
    CLIENTS_DATA.forEach((client, index) => {
      const clientItem = clientItems[index];
      expect(clientItem.querySelector('.client-name').textContent).toContain(client.name);
      expect(clientItem.querySelector('.client-version').textContent).toContain(client.version);
      expect(clientItem.querySelector('.client-description').textContent).toContain(client.description);
    });
  });

  it('should integrate with custom input data', () => {
    const customClients: Client[] = [
      {
        id: 1,
        name: 'Cliente Customizado',
        logo: '/custom-logo.png',
        website: 'https://custom.com',
        description: 'Descrição customizada',
        version: 'v2.0',
        services: [
          { name: 'Custom Service', category: 'Custom' }
        ],
        projectImage: '/custom-project.jpg',
        projectImageAlt: 'Projeto customizado'
      }
    ];

    component.title = 'Título Customizado';
    component.description = 'Descrição customizada';
    component.clients = customClients;
    fixture.detectChanges();

    // Verify custom data is used
    expect(component.title).toBe('Título Customizado');
    expect(component.description).toBe('Descrição customizada');
    expect(component.clients).toEqual(customClients);

    // Verify template renders custom data
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.section-title').textContent).toContain('Título Customizado');
    expect(compiled.querySelector('.section-description').textContent).toContain('Descrição customizada');

    const clientItems = compiled.querySelectorAll('.client-item');
    expect(clientItems.length).toBe(1);
    expect(clientItems[0].querySelector('.client-name').textContent).toContain('Cliente Customizado');
  });

  it('should integrate image error handling with UI feedback', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const firstClientLogo = compiled.querySelector('.client-logo img');

    // Simulate image error
    const mockEvent = {
      target: {
        style: { display: '' },
        parentElement: {
          innerHTML: ''
        }
      }
    };

    component.onImageError(mockEvent);

    // Verify error handling
    expect(mockEvent.target.style.display).toBe('none');
    expect(mockEvent.target.parentElement.innerHTML).toContain('fa-building');
  });

  it('should integrate project image error handling with UI feedback', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const firstProjectImage = compiled.querySelector('.project-image img');

    // Simulate project image error
    const mockEvent = {
      target: {
        style: { display: '' },
        parentElement: {
          innerHTML: ''
        }
      }
    };

    component.onProjectImageError(mockEvent);

    // Verify error handling
    expect(mockEvent.target.style.display).toBe('none');
    expect(mockEvent.target.parentElement.innerHTML).toContain('fa-image');
  });

  it('should integrate service category styling with CSS classes', () => {
    const clientWithServices: Client = {
      id: 1,
      name: 'Test Client',
      logo: '/test-logo.png',
      website: 'https://test.com',
      description: 'Test description',
      version: 'v1.0',
      services: [
        { name: 'Design', category: 'Design' },
        { name: 'Site', category: 'Site' },
        { name: 'UX', category: 'UX' }
      ],
      projectImage: '/test-project.jpg',
      projectImageAlt: 'Test project'
    };

    component.clients = [clientWithServices];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const serviceTags = compiled.querySelectorAll('.service-tag');

    // Verify service tags are rendered with correct CSS classes
    expect(serviceTags.length).toBe(3);
    expect(serviceTags[0].classList.contains('service-design')).toBeTrue();
    expect(serviceTags[1].classList.contains('service-site')).toBeTrue();
    expect(serviceTags[2].classList.contains('service-ux')).toBeTrue();
  });

  it('should integrate conditional rendering based on client data', () => {
    const clientWithProject: Client = {
      id: 1,
      name: 'Client with Project',
      logo: '/logo.png',
      website: 'https://example.com',
      description: 'Description',
      version: 'v1.0',
      services: [{ name: 'Service', category: 'Service' }],
      projectImage: '/project.jpg',
      projectImageAlt: 'Project'
    };

    const clientWithoutProject: Client = {
      id: 2,
      name: 'Client without Project',
      logo: '/logo.png',
      description: 'Description',
      version: 'v1.0',
      services: [{ name: 'Service', category: 'Service' }]
    };

    const clientWithoutWebsite: Client = {
      id: 3,
      name: 'Client without Website',
      logo: '/logo.png',
      description: 'Description',
      version: 'v1.0',
      services: [{ name: 'Service', category: 'Service' }],
      projectImage: '/project.jpg',
      projectImageAlt: 'Project'
    };

    component.clients = [clientWithProject, clientWithoutProject, clientWithoutWebsite];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const clientItems = compiled.querySelectorAll('.client-item');

    // Verify first client has project image and website
    expect(clientItems[0].querySelector('.client-project')).toBeTruthy();
    expect(clientItems[0].querySelector('.client-actions')).toBeTruthy();
    expect(clientItems[0].querySelector('.btn')).toBeTruthy();

    // Verify second client has no project image but has website
    expect(clientItems[1].querySelector('.client-project')).toBeFalsy();
    expect(clientItems[1].querySelector('.client-actions')).toBeTruthy();

    // Verify third client has project image but no website
    expect(clientItems[2].querySelector('.client-project')).toBeTruthy();
    expect(clientItems[2].querySelector('.client-actions')).toBeFalsy();
  });

  it('should integrate responsive design classes', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const clientsSection = compiled.querySelector('.clients-section');
    const clientsGrid = compiled.querySelector('.clients-grid');

    // Verify responsive classes are applied
    expect(clientsSection).toBeTruthy();
    expect(clientsGrid).toBeTruthy();
    expect(clientsSection.classList.contains('clients-section')).toBeTrue();
    expect(clientsGrid.classList.contains('clients-grid')).toBeTrue();
  });

  it('should integrate with external website links', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const websiteLinks = compiled.querySelectorAll('.btn');

    // Verify website links have correct attributes
    websiteLinks.forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//);
    });
  });

  it('should integrate accessibility features', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const websiteLinks = compiled.querySelectorAll('.btn');
    const images = compiled.querySelectorAll('img');

    // Verify accessibility attributes
    websiteLinks.forEach(link => {
      expect(link.getAttribute('aria-label')).toContain('Visitar site do');
    });

    images.forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });

  it('should integrate with empty clients array', () => {
    component.clients = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const clientItems = compiled.querySelectorAll('.client-item');

    // Verify no client items are rendered
    expect(clientItems.length).toBe(0);

    // Verify section header is still rendered
    expect(compiled.querySelector('.section-title')).toBeTruthy();
    expect(compiled.querySelector('.section-description')).toBeTruthy();
  });

  it('should integrate with clients having different service categories', () => {
    const clientsWithDifferentServices: Client[] = [
      {
        id: 1,
        name: 'Design Client',
        logo: '/logo.png',
        description: 'Description',
        version: 'v1.0',
        services: [
          { name: 'Design', category: 'Design' },
          { name: 'UX', category: 'UX' }
        ]
      },
      {
        id: 2,
        name: 'Tech Client',
        logo: '/logo.png',
        description: 'Description',
        version: 'v1.0',
        services: [
          { name: 'APIs', category: 'APIs' },
          { name: 'Integração', category: 'Integração' },
          { name: 'Banco de Dados', category: 'Banco de Dados' }
        ]
      }
    ];

    component.clients = clientsWithDifferentServices;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const serviceTags = compiled.querySelectorAll('.service-tag');

    // Verify all service categories are rendered with correct classes
    expect(serviceTags[0].classList.contains('service-design')).toBeTrue();
    expect(serviceTags[1].classList.contains('service-ux')).toBeTrue();
    expect(serviceTags[2].classList.contains('service-apis')).toBeTrue();
    expect(serviceTags[3].classList.contains('service-integracao')).toBeTrue();
    expect(serviceTags[4].classList.contains('service-banco-de-dados')).toBeTrue();
  });
});
