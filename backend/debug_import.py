import importlib, traceback

try:
    m = importlib.import_module('ai.processor')
    print('Imported ai.processor OK')
    print('module file:', getattr(m, '__file__', None))
    print('Has process_document:', hasattr(m, 'process_document'))
    print('module dict keys:', sorted(k for k in m.__dict__.keys() if not k.startswith('__')))
except Exception:
    print('Exception during import:')
    traceback.print_exc()
