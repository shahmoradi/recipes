#!/usr/bin/env python
from platform import python_version
print ('This is Python version', python_version(), '\n')
my_string = 'Python is the best language for String manipulation!'
print(my_string + '\n')
print(my_string[::-1] + '\n')
print(my_string[::-2] + '\n')
print(my_string.swapcase() + '\n')
print(
"""
The sentence '%s' contains 
%d 'a' letters, and
%d 'A' letters!
"""
    % (my_string, my_string.count('a'), my_string.count('A'))
    )
print( my_string.replace(' ','\n') + '\n')
print( my_string.upper().replace(' ','\n') )