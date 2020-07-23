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

def getSumDistSq(meanValue):
    sumDistSq = np.sum( (Data-meanValue)**2 );
    return sumDistSq

bestMeanValue = fmin( func = getSumDistSq
                    , x0 = 10
                    )
bestMeanValue = bestMeanValue[0]
simpleMean = np.sum(Data)/len(Data)
print( """
Least-Squares mean = {}
simple average formula = {}
relative difference = {}
""".format( bestMeanValue, simpleMean, 2*abs((bestMeanValue-simpleMean)/(bestMeanValue+simpleMean)) ) )