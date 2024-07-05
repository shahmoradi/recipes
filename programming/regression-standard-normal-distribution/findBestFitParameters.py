#!python
#!/usr/bin/env python
from scipy.io import loadmat
import numpy as np
from scipy.stats import norm
from scipy.optimize import fmin


# load MATLAB data file
Drand = loadmat("Drand.mat")
Data  = Drand["Drand"]


import matplotlib.pyplot as plt
fig = plt.figure( figsize=(9, 8) \
                , dpi= 300 \
                , facecolor='w' \
                , edgecolor='w' \
                ) # create figure object
ax = fig.add_subplot(1,1,1) # Get the axes instance

plt.hist(Data)

plt.show()

# find the parameters of Gaussian distribution

def getNegLogProbNorm(Param):
    avg = Param[0];
    std = Param[1];
    getNegLogProbNorm = - np.sum( np.log( norm.pdf(x = Data, loc = avg, scale = std) ) );
    return getNegLogProbNorm

Parameters = fmin   ( func = getNegLogProbNorm  \
                    , x0 = np.array([1,10])     \
                    )
print( "mean = {}, standard-deviation = {}".format(Parameters[0],Parameters[1]) )