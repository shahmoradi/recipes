#!/usr/bin/env python
import sys
g = 9.81
try:
    v0 = float(sys.argv[1])
    t = float(sys.argv[2])
except IndexError:
    print('Both v0 and t must be supplied on the command line')
    v0 = float(input('v0 = ?\n'))
    t = float(input('t = ?\n'))
except ValueError:
    print('v0 and t must be pure numbers')
    sys.exit(1)

if t < 0 or t > 2 * v0 / g:
    raise ValueError('t = {} is a non-physical value.\n'
                     'must be between 0 and 2v0/g = {}'.format(t,2.0*v0/g))
    sys.exit(1)

y = v0 * t - 0.5 * g * t ** 2
print('y = {}'.format(y))