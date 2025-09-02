import { TestBed } from '@angular/core/testing';
import { ToasterService } from './toaster.service';
import { ToastMessage } from './toaster.component';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterService]
    });
    service = TestBed.inject(ToasterService);
  });

  afterEach(() => {
    service.clearAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty messages', () => {
    service.messages$.subscribe(messages => {
      expect(messages).toEqual([]);
    });
  });

  describe('showSuccess', () => {
    it('should add success message with default duration', () => {
      const message = 'Success message';
      service.showSuccess(message);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].message).toBe(message);
        expect(messages[0].type).toBe('success');
        expect(messages[0].duration).toBe(5000);
        expect(messages[0].id).toBeDefined();
      });
    });

    it('should add success message with custom duration', () => {
      const message = 'Success message';
      const duration = 3000;
      service.showSuccess(message, duration);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].duration).toBe(duration);
      });
    });
  });

  describe('showError', () => {
    it('should add error message with default duration', () => {
      const message = 'Error message';
      service.showError(message);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].message).toBe(message);
        expect(messages[0].type).toBe('error');
        expect(messages[0].duration).toBe(7000);
        expect(messages[0].id).toBeDefined();
      });
    });

    it('should add error message with custom duration', () => {
      const message = 'Error message';
      const duration = 10000;
      service.showError(message, duration);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].duration).toBe(duration);
      });
    });
  });

  describe('showWarning', () => {
    it('should add warning message with default duration', () => {
      const message = 'Warning message';
      service.showWarning(message);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].message).toBe(message);
        expect(messages[0].type).toBe('warning');
        expect(messages[0].duration).toBe(6000);
        expect(messages[0].id).toBeDefined();
      });
    });

    it('should add warning message with custom duration', () => {
      const message = 'Warning message';
      const duration = 8000;
      service.showWarning(message, duration);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].duration).toBe(duration);
      });
    });
  });

  describe('showInfo', () => {
    it('should add info message with default duration', () => {
      const message = 'Info message';
      service.showInfo(message);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].message).toBe(message);
        expect(messages[0].type).toBe('info');
        expect(messages[0].duration).toBe(5000);
        expect(messages[0].id).toBeDefined();
      });
    });

    it('should add info message with custom duration', () => {
      const message = 'Info message';
      const duration = 4000;
      service.showInfo(message, duration);

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(1);
        expect(messages[0].duration).toBe(duration);
      });
    });
  });

  describe('removeMessage', () => {
    it('should remove specific message by id', () => {
      service.showSuccess('Message 1');
      service.showError('Message 2');
      service.showWarning('Message 3');

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(3);

      // Remove the second message
      const messageToRemove = messages[1];
      service.removeMessage(messageToRemove.id);

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(2);
        expect(msgs.find(msg => msg.id === messageToRemove.id)).toBeUndefined();
      });
    });

    it('should not remove message if id does not exist', () => {
      service.showSuccess('Message 1');
      service.showError('Message 2');

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(2);

      service.removeMessage('non-existent-id');

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(2);
      });
    });
  });

  describe('clearAll', () => {
    it('should remove all messages', () => {
      service.showSuccess('Message 1');
      service.showError('Message 2');
      service.showWarning('Message 3');
      service.showInfo('Message 4');

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(4);

      service.clearAll();

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(0);
      });
    });

    it('should work when no messages exist', () => {
      service.clearAll();

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(0);
      });
    });
  });

  describe('multiple messages', () => {
    it('should handle multiple messages of different types', () => {
      service.showSuccess('Success message');
      service.showError('Error message');
      service.showWarning('Warning message');
      service.showInfo('Info message');

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(4);
        expect(messages[0].type).toBe('success');
        expect(messages[1].type).toBe('error');
        expect(messages[2].type).toBe('warning');
        expect(messages[3].type).toBe('info');
      });
    });

    it('should maintain order of messages', () => {
      service.showSuccess('First message');
      service.showError('Second message');
      service.showWarning('Third message');

      service.messages$.subscribe(messages => {
        expect(messages[0].message).toBe('First message');
        expect(messages[1].message).toBe('Second message');
        expect(messages[2].message).toBe('Third message');
      });
    });
  });

  describe('auto-removal', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should auto-remove message after duration', () => {
      service.showSuccess('Test message', 1000);

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(1);

      jasmine.clock().tick(1000);

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(0);
      });
    });

    it('should not auto-remove message with duration 0', () => {
      service.showSuccess('Test message', 0);

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(1);

      jasmine.clock().tick(10000); // Wait longer than any default duration

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(1);
      });
    });

    it('should only remove the specific message after its duration', () => {
      service.showSuccess('Message 1', 1000);
      service.showError('Message 2', 2000);

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages.length).toBe(2);

      jasmine.clock().tick(1000);

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(1);
        expect(msgs[0].type).toBe('error');
      });

      jasmine.clock().tick(1000);

      service.messages$.subscribe(msgs => {
        expect(msgs.length).toBe(0);
      });
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      service.showSuccess('Message 1');
      service.showError('Message 2');

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(messages[0].id).toBeDefined();
      expect(messages[1].id).toBeDefined();
      expect(messages[0].id).not.toBe(messages[1].id);
    });

    it('should generate string IDs', () => {
      service.showSuccess('Test message');

      let messages: ToastMessage[] = [];
      service.messages$.subscribe(msgs => messages = msgs);

      expect(typeof messages[0].id).toBe('string');
    });
  });

  describe('observable behavior', () => {
    it('should emit new values when messages change', () => {
      let emissionCount = 0;
      service.messages$.subscribe(() => {
        emissionCount++;
      });

      expect(emissionCount).toBe(1); // Initial empty array

      service.showSuccess('Message 1');
      expect(emissionCount).toBe(2);

      service.showError('Message 2');
      expect(emissionCount).toBe(3);

      service.removeMessage('some-id');
      expect(emissionCount).toBe(4);

      service.clearAll();
      expect(emissionCount).toBe(5);
    });

    it('should provide current messages to new subscribers', () => {
      service.showSuccess('Message 1');
      service.showError('Message 2');

      service.messages$.subscribe(messages => {
        expect(messages.length).toBe(2);
      });
    });
  });
});
