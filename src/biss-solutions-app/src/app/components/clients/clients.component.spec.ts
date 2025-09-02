import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsComponent } from './clients.component';
import { Client, ClientService } from './clients.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  const mockClient: Client = {
    id: 1,
    name: 'Test Client',
    logo: '/test-logo.png',
    website: 'https://test.com',
    description: 'Test description',
    version: 'Test version',
    services: [
      { name: 'Design', category: 'Design' },
      { name: 'Site', category: 'Site' }
    ],
    projectImage: '/test-project.jpg',
    projectImageAlt: 'Test project'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default title and description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.section-title').textContent).toContain('Nossos Clientes');
    expect(compiled.querySelector('.section-description').textContent).toContain('Empresas que confiam em nossas soluções e serviços');
  });

  it('should display custom title and description when provided', () => {
    component.title = 'Custom Title';
    component.description = 'Custom Description';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.section-title').textContent).toContain('Custom Title');
    expect(compiled.querySelector('.section-description').textContent).toContain('Custom Description');
  });

  it('should display all clients from the input array', () => {
    component.clients = [mockClient];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.client-name').textContent).toContain('Test Client');
    expect(compiled.querySelector('.client-version').textContent).toContain('Test version');
    expect(compiled.querySelector('.client-description').textContent).toContain('Test description');
  });

  it('should display client services as tags', () => {
    component.clients = [mockClient];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const serviceTags = compiled.querySelectorAll('.service-tag');
    expect(serviceTags.length).toBe(2);
    expect(serviceTags[0].textContent).toContain('Design');
    expect(serviceTags[1].textContent).toContain('Site');
  });

  it('should display project image when available', () => {
    component.clients = [mockClient];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const projectImage = compiled.querySelector('.project-image img');
    expect(projectImage).toBeTruthy();
    expect(projectImage.src).toContain('test-project.jpg');
    expect(projectImage.alt).toContain('Test project');
  });

  it('should display website link when available', () => {
    component.clients = [mockClient];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const websiteLink = compiled.querySelector('.btn');
    expect(websiteLink).toBeTruthy();
    expect(websiteLink.href).toContain('https://test.com');
    expect(websiteLink.target).toBe('_blank');
  });

  it('should not display project image section when projectImage is not provided', () => {
    const clientWithoutImage = { ...mockClient };
    delete clientWithoutImage.projectImage;
    
    component.clients = [clientWithoutImage];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const projectSection = compiled.querySelector('.client-project');
    expect(projectSection).toBeFalsy();
  });

  it('should not display website link when website is not provided', () => {
    const clientWithoutWebsite = { ...mockClient };
    delete clientWithoutWebsite.website;
    
    component.clients = [clientWithoutWebsite];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const websiteLink = compiled.querySelector('.btn');
    expect(websiteLink).toBeFalsy();
  });

  it('should handle image error for logo', () => {
    const mockEvent = {
      target: {
        style: { display: '' },
        parentElement: {
          innerHTML: ''
        }
      }
    };

    component.onImageError(mockEvent);
    expect(mockEvent.target.style.display).toBe('none');
    expect(mockEvent.target.parentElement.innerHTML).toContain('fa-building');
  });

  it('should handle image error for project image', () => {
    const mockEvent = {
      target: {
        style: { display: '' },
        parentElement: {
          innerHTML: ''
        }
      }
    };

    component.onProjectImageError(mockEvent);
    expect(mockEvent.target.style.display).toBe('none');
    expect(mockEvent.target.parentElement.innerHTML).toContain('fa-image');
  });

  it('should apply correct CSS classes for service categories', () => {
    component.clients = [mockClient];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const designTag = compiled.querySelector('.service-design');
    const siteTag = compiled.querySelector('.service-site');
    
    expect(designTag).toBeTruthy();
    expect(siteTag).toBeTruthy();
  });

  it('should have responsive design classes', () => {
    const compiled = fixture.nativeElement;
    const clientsSection = compiled.querySelector('.clients-section');
    const clientsGrid = compiled.querySelector('.clients-grid');
    
    expect(clientsSection).toBeTruthy();
    expect(clientsGrid).toBeTruthy();
  });
});
