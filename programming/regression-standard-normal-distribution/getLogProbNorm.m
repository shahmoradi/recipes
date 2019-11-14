function logProbNorm = getLogProbNorm(Param)
    global data
    mu = Param(1);
    sigma = Param(2);
    logProbNorm = - sum( log( normpdf(data,mu,sigma) ) );
end