from math import pi, exp, sqrt

mu = 0
sigma = 2.0
x = 1.0

f = 1 / (sqrt(2 * pi) * sigma) * exp(-0.5 * ((x - mu) / sigma) ** 2)
print ("""
python Gaussian.py
Sample run:
mu = {0}
sigma = {1}
x = {2}
f(x|mu,sigma) = {3}
Wolfram Alpha result for the same input variables and parameters: {4}
""".format(mu,sigma,x,f,wolfram_alpha_result)
)
