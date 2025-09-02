import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService, SEOMetaData } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;
  let title: Title;

  const mockMetaData: SEOMetaData = {
    title: 'Test Page - Biss Solutions',
    description: 'Test description for SEO',
    keywords: 'test, keywords, seo',
    author: 'Test Author',
    ogTitle: 'Test OG Title',
    ogDescription: 'Test OG Description',
    ogImage: 'https://example.com/test-image.jpg',
    ogUrl: 'https://example.com/test-page',
    canonicalUrl: 'https://example.com/test-page'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Meta, Title]
    });
    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
    title = TestBed.inject(Title);
  });

  afterEach(() => {
    // Clean up DOM
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update page title', () => {
    service.updateMetaTags(mockMetaData);
    expect(title.getTitle()).toBe('Test Page - Biss Solutions');
  });

  it('should update meta description', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('name="description"')?.content).toBe('Test description for SEO');
  });

  it('should update meta keywords when provided', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('name="keywords"')?.content).toBe('test, keywords, seo');
  });

  it('should update meta author when provided', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('name="author"')?.content).toBe('Test Author');
  });

  it('should not add keywords meta tag when not provided', () => {
    const dataWithoutKeywords = { ...mockMetaData };
    delete dataWithoutKeywords.keywords;

    service.updateMetaTags(dataWithoutKeywords);
    expect(meta.getTag('name="keywords"')).toBeNull();
  });

  it('should not add author meta tag when not provided', () => {
    const dataWithoutAuthor = { ...mockMetaData };
    delete dataWithoutAuthor.author;

    service.updateMetaTags(dataWithoutAuthor);
    expect(meta.getTag('name="author"')).toBeNull();
  });

  it('should update Open Graph title', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('property="og:title"')?.content).toBe('Test OG Title');
  });

  it('should use page title as fallback for OG title', () => {
    const dataWithoutOgTitle = { ...mockMetaData };
    delete dataWithoutOgTitle.ogTitle;

    service.updateMetaTags(dataWithoutOgTitle);
    expect(meta.getTag('property="og:title"')?.content).toBe('Test Page - Biss Solutions');
  });

  it('should update Open Graph description', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('property="og:description"')?.content).toBe('Test OG Description');
  });

  it('should use page description as fallback for OG description', () => {
    const dataWithoutOgDescription = { ...mockMetaData };
    delete dataWithoutOgDescription.ogDescription;

    service.updateMetaTags(dataWithoutOgDescription);
    expect(meta.getTag('property="og:description"')?.content).toBe('Test description for SEO');
  });

  it('should update Open Graph image when provided', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('property="og:image"')?.content).toBe('https://example.com/test-image.jpg');
  });

  it('should not add OG image meta tag when not provided', () => {
    const dataWithoutOgImage = { ...mockMetaData };
    delete dataWithoutOgImage.ogImage;

    service.updateMetaTags(dataWithoutOgImage);
    expect(meta.getTag('property="og:image"')).toBeNull();
  });

  it('should update Open Graph URL when provided', () => {
    service.updateMetaTags(mockMetaData);
    expect(meta.getTag('property="og:url"')?.content).toBe('https://example.com/test-page');
  });

  it('should not add OG URL meta tag when not provided', () => {
    const dataWithoutOgUrl = { ...mockMetaData };
    delete dataWithoutOgUrl.ogUrl;

    service.updateMetaTags(dataWithoutOgUrl);
    expect(meta.getTag('property="og:url"')).toBeNull();
  });

  it('should add canonical URL when provided', () => {
    service.updateMetaTags(mockMetaData);
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(canonical).toBeTruthy();
    expect(canonical.href).toBe('https://example.com/test-page');
  });

  it('should replace existing canonical URL', () => {
    // Add initial canonical
    const initialCanonical = document.createElement('link');
    initialCanonical.rel = 'canonical';
    initialCanonical.href = 'https://example.com/old-page';
    document.head.appendChild(initialCanonical);

    // Update with new canonical
    service.updateMetaTags(mockMetaData);

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(canonical.href).toBe('https://example.com/test-page');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });

  it('should not add canonical URL when not provided', () => {
    const dataWithoutCanonical = { ...mockMetaData };
    delete dataWithoutCanonical.canonicalUrl;

    service.updateMetaTags(dataWithoutCanonical);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeNull();
  });

  it('should reset to default meta tags', () => {
    // First set custom meta tags
    service.updateMetaTags(mockMetaData);
    expect(title.getTitle()).toBe('Test Page - Biss Solutions');

    // Then reset to defaults
    service.resetMetaTags();
    expect(title.getTitle()).toBe('Biss Solutions - Especialistas em Desenvolvimento de Software e Soluções em TI');
    expect(meta.getTag('name="description"')?.content).toContain('Biss Solutions - Especializada em criar');
  });

  it('should track page view when gtag is available', () => {
    // Mock gtag function
    (window as any).gtag = jasmine.createSpy('gtag');

    service.updateMetaTags(mockMetaData);

    expect((window as any).gtag).toHaveBeenCalledWith('config', 'G-2GXS114MJC', {
      'page_title': 'Test Page - Biss Solutions',
      'page_location': window.location.href,
      'custom_map': {
        'dimension1': 'user_type',
        'dimension2': 'service_category'
      }
    });
  });

  it('should not track page view when gtag is not available', () => {
    // Ensure gtag is not available
    delete (window as any).gtag;

    expect(() => service.updateMetaTags(mockMetaData)).not.toThrow();
  });

  it('should track custom events when gtag is available', () => {
    (window as any).gtag = jasmine.createSpy('gtag');

    service.trackEvent('click', 'button', 'header-cta', 1);

    expect((window as any).gtag).toHaveBeenCalledWith('event', 'click', {
      'event_category': 'button',
      'event_label': 'header-cta',
      'value': 1
    });
  });

  it('should track conversions when gtag is available', () => {
    (window as any).gtag = jasmine.createSpy('gtag');

    service.trackConversion('123456789', 'ABC123');

    expect((window as any).gtag).toHaveBeenCalledWith('event', 'conversion', {
      'send_to': 'AW-123456789/ABC123'
    });
  });

  it('should track LinkedIn conversions when lintrk is available', () => {
    (window as any).lintrk = jasmine.createSpy('lintrk');

    service.trackLinkedInConversion('12345');

    expect((window as any).lintrk).toHaveBeenCalledWith('track', { conversion_id: '12345' });
  });

  it('should not throw error when tracking functions are not available', () => {
    delete (window as any).gtag;
    delete (window as any).lintrk;

    expect(() => service.trackEvent('click', 'button')).not.toThrow();
    expect(() => service.trackConversion('123', '456')).not.toThrow();
    expect(() => service.trackLinkedInConversion('123')).not.toThrow();
  });
});
