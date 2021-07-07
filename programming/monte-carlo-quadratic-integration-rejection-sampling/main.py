import numpy as np

ndim = 10
xmin = 0
xmax = 1

getFunc = lambda point: np.sum(point)**2
maxHeightFunc = getFunc(ndim*[max(xmin,xmax)])
#getNegFunc = lambda point: maxHeightFunc - getFunc(point)
boxVolume = maxHeightFunc


numAcceptedRejected = 0
numAccepted = 0

truth = 155/6.
integral = []

while True:

    numAcceptedRejected += 1

    if maxHeightFunc * np.random.rand() <= getFunc(np.random.rand(ndim)): numAccepted += 1
    integral.append(boxVolume * numAccepted / numAcceptedRejected)

    delta = np.abs(1 - integral[-1] / truth)
    #if numAcceptedRejected%100 == 0: print(numAccepted, numAcceptedRejected, delta, integral[-1])
    if numAcceptedRejected > 1 and delta <= 0.00001:
        #print(np.abs((integral[-1] - integral[-2]) / integral[-1]))
        break

print("integral = {}, relative accuracy = {}".format(integral[-1],np.double(delta)))

import seaborn as sns
import matplotlib.pyplot as plt
sns.set()
plt.figure()
ax = plt.plot   ( range(1,len(integral)+1)
                , integral
                )
plt.xscale("log")
plt.title("integral = {},\n relative accuracy = {}".format(integral[-1],np.double(delta)))
plt.xlabel("log10( Number of Monte Carlo Rejection Sampling Steps )")
plt.ylabel("Integral Result")