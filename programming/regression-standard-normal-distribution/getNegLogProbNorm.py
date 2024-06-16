def getNegLogProbNorm(Param)
    import numpy as np
    import scipy as sp
    avg = Param[0];
    std = Param[1];
    getNegLogProbNorm = - np.sum( np.log( sp.norm.pdf(x = Drand["Drand"], loc = avg, scale = std) ) );
    return getNegLogProbNorm