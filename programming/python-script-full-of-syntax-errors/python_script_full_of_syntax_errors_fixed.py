#! /usr/bin/env python

a1 = 2  # variable names cannot start with number
b = a1  # b is not defined yet, so it can be for example defined by a1
x = 2
y = x + 4   # Python is case-sensitive        
from math import tan, pi    # The correct module name is math (lower case), also import pi for the next line
print(tan(pi))  # add parantheses to make print function work
pi = "3.14159"  # correct the quotation mark
print (tan(float(pi)))  # add parantheses to make print function work. Also, pi is string, convert it to float before use
c = 4**3**2**3
_ = ((c-78564)/c + 32)
discount = 0.12
AMOUNT = 120. # Only value is allowed on the left-hand side
amount = 120    # Only value is allowed on the left-hand side
address = 'hpl@simula.no'   # String has to be inside quotation marks
And = duck = 0   # and is a Python reserved word, capitalize A to make it work. Also name duck is undefined. Set them both to some value.
Class = "INF1100, gr 2" # same thing as above for and, also correct the quotation marks
continue_ = x > 0
rev = fox = True
Persian = ['a human language']
true = fox is rev in Persian