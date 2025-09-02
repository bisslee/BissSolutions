import { TestBed } from '@angular/core/testing';
import { ImageOptimizationService, ImageOptimizationOptions } from './image-optimization.service';

describe('ImageOptimizationService', () => {
  let service: ImageOptimizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageOptimizationService]
    });
    service = TestBed.inject(ImageOptimizationService);
  });

  afterEach(() => {
    // Clean up any preload links added during tests
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    preloadLinks.forEach(link => link.remove());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('optimizeImage', () => {
    it('should return optimized image object with default options', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const result = service.optimizeImage(originalSrc);

      expect(result).toEqual({
        src: jasmine.any(String),
        srcset: jasmine.any(String),
        sizes: jasmine.any(String),
        webp: jasmine.any(String),
        avif: jasmine.any(String),
        fallback: jasmine.any(String)
      });
    });

    it('should use custom options when provided', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: Partial<ImageOptimizationOptions> = {
        quality: 90,
        format: 'jpg',
        width: 800,
        height: 600
      };

      const result = service.optimizeImage(originalSrc, options);

      expect(result.src).toContain('q=90');
      expect(result.src).toContain('f=jpg');
      expect(result.src).toContain('w=800');
      expect(result.src).toContain('h=600');
    });
  });

  describe('generateOptimizedUrl', () => {
    it('should generate URL with optimization parameters', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp',
        width: 640,
        height: 480,
        fit: 'cover',
        compression: 'lossy'
      };

      const result = service.generateOptimizedUrl(originalSrc, options);

      expect(result).toContain('https://example.com/image.jpg?');
      expect(result).toContain('q=80');
      expect(result).toContain('f=webp');
      expect(result).toContain('w=640');
      expect(result).toContain('h=480');
      expect(result).toContain('fit=cover');
      expect(result).toContain('c=lossy');
    });

    it('should handle URL with existing query parameters', () => {
      const originalSrc = 'https://example.com/image.jpg?existing=param';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp'
      };

      const result = service.generateOptimizedUrl(originalSrc, options);

      expect(result).toContain('https://example.com/image.jpg?');
      expect(result).toContain('q=80');
      expect(result).toContain('f=webp');
    });
  });

  describe('generateSrcSet', () => {
    it('should generate srcset with multiple sizes', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp'
      };

      const result = service.generateSrcSet(originalSrc, options);

      expect(result).toContain('320w');
      expect(result).toContain('640w');
      expect(result).toContain('960w');
      expect(result).toContain('1280w');
      expect(result).toContain('1920w');
    });

    it('should include custom width in srcset', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp',
        width: 800
      };

      const result = service.generateSrcSet(originalSrc, options);

      expect(result).toContain('w=800');
    });
  });

  describe('generateSizes', () => {
    it('should generate responsive sizes string', () => {
      const result = service.generateSizes();

      expect(result).toContain('(max-width: 320px) 320px');
      expect(result).toContain('(max-width: 768px) 640px');
      expect(result).toContain('(max-width: 1024px) 960px');
      expect(result).toContain('(max-width: 1440px) 1280px');
      expect(result).toContain('1920px');
    });
  });

  describe('generateWebPUrl', () => {
    it('should generate WebP URL', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'jpg'
      };

      const result = service.generateWebPUrl(originalSrc, options);

      expect(result).toContain('f=webp');
    });
  });

  describe('generateAvifUrl', () => {
    it('should generate AVIF URL', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'jpg'
      };

      const result = service.generateAvifUrl(originalSrc, options);

      expect(result).toContain('f=avif');
    });
  });

  describe('generateFallbackUrl', () => {
    it('should generate fallback URL with JPG format for WebP', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp'
      };

      const result = service.generateFallbackUrl(originalSrc, options);

      expect(result).toContain('f=jpg');
    });

    it('should keep original format for non-WebP formats', () => {
      const originalSrc = 'https://example.com/image.jpg';
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'png'
      };

      const result = service.generateFallbackUrl(originalSrc, options);

      expect(result).toContain('f=png');
    });
  });

  describe('preloadImage', () => {
    it('should add preload link to document head', () => {
      const src = 'https://example.com/image.jpg';
      const options: Partial<ImageOptimizationOptions> = {
        quality: 80,
        format: 'webp'
      };

      service.preloadImage(src, options);

      const preloadLink = document.querySelector('link[rel="preload"]') as HTMLLinkElement;
      expect(preloadLink).toBeTruthy();
      expect(preloadLink.as).toBe('image');
      expect(preloadLink.href).toContain('https://example.com/image.jpg');
    });

    it('should use default options when none provided', () => {
      const src = 'https://example.com/image.jpg';

      service.preloadImage(src);

      const preloadLink = document.querySelector('link[rel="preload"]') as HTMLLinkElement;
      expect(preloadLink).toBeTruthy();
      expect(preloadLink.href).toContain('https://example.com/image.jpg');
    });
  });

  describe('setupLazyLoading', () => {
    it('should setup intersection observer for lazy loading', () => {
      const mockImages = [
        { dataset: { src: 'https://example.com/image1.jpg' } } as HTMLImageElement,
        { dataset: { src: 'https://example.com/image2.jpg' } } as HTMLImageElement
      ];

      // Mock IntersectionObserver
      const mockObserver = {
        observe: jasmine.createSpy('observe'),
        unobserve: jasmine.createSpy('unobserve')
      };

      spyOn(window, 'IntersectionObserver').and.returnValue(mockObserver as any);

      service.setupLazyLoading(mockImages);

      expect(window.IntersectionObserver).toHaveBeenCalled();
      expect(mockObserver.observe).toHaveBeenCalledTimes(2);
    });

    it('should fallback to loadAllImages when IntersectionObserver is not supported', () => {
      const mockImages = [
        { dataset: { src: 'https://example.com/image1.jpg' } } as HTMLImageElement
      ];

      // Mock that IntersectionObserver is not available
      spyOn(window, 'IntersectionObserver').and.throwError('Not supported');

      // Spy on the private method through public interface
      spyOn(service as any, 'loadAllImages').and.callThrough();

      expect(() => service.setupLazyLoading(mockImages)).not.toThrow();
    });
  });

  describe('compressImage', () => {
    it('should compress image file', async () => {
      // Create a mock file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(resolve!, 'image/jpeg', 0.8);
      });

      const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

      const result = await service.compressImage(file, 0.5);

      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('image/jpeg');
    });
  });

  describe('convertToWebP', () => {
    it('should convert image to WebP format', async () => {
      // Create a mock file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(resolve!, 'image/jpeg', 0.8);
      });

      const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

      const result = await service.convertToWebP(file, 0.5);

      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('image/webp');
    });
  });

  describe('private methods', () => {
    it('should detect WebP support', () => {
      const result = (service as any).supportsWebP();
      expect(typeof result).toBe('boolean');
    });

    it('should detect AVIF support', () => {
      const result = (service as any).supportsAvif();
      expect(typeof result).toBe('boolean');
    });

    it('should extract base URL from image source', () => {
      const src = 'https://example.com/image.jpg?param=value';
      const result = (service as any).getBaseUrl(src);
      expect(result).toBe('https://example.com/image.jpg');
    });

    it('should build optimization parameters', () => {
      const options: ImageOptimizationOptions = {
        quality: 80,
        format: 'webp',
        width: 640,
        height: 480,
        fit: 'cover',
        compression: 'lossy'
      };

      const result = (service as any).buildOptimizationParams(options);

      expect(result).toContain('q=80');
      expect(result).toContain('f=webp');
      expect(result).toContain('w=640');
      expect(result).toContain('h=480');
      expect(result).toContain('fit=cover');
      expect(result).toContain('c=lossy');
    });

    it('should merge options with defaults', () => {
      const customOptions: Partial<ImageOptimizationOptions> = {
        quality: 90,
        format: 'png'
      };

      const result = (service as any).mergeOptions(customOptions);

      expect(result.quality).toBe(90);
      expect(result.format).toBe('png');
      expect(result.fit).toBe('cover'); // default value
      expect(result.compression).toBe('lossy'); // default value
    });
  });
});
