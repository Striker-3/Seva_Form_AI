import importlib, traceback, pathlib, inspect
try:
    m = importlib.import_module('ai.processor')
    print('module file:', getattr(m, '__file__', None))
    print('dict keys:', sorted(list(m.__dict__.keys())))
    p = pathlib.Path(m.__file__)
    print('\nRAW SOURCE REPR:\n', repr(p.read_text()))
    print('\nINSPECT SOURCE:\n')
    print(inspect.getsource(m))
except Exception:
    traceback.print_exc()
