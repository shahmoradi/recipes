import time
import numpy as np

def fib():

    def fibo(n_int):
        if n_int > 1:
            FibSeq = np.zeros(n_int+1)
            FibSeq[0] = 0;
            FibSeq[1] = 1;
            for iseq in range(2,n_int+1):
                FibSeq[iseq] = FibSeq[iseq-1] + FibSeq[iseq-2];
            fib = FibSeq[n_int]
        elif n_int == 1:
            fib = 1
        else:
            fib = 0
        return int(fib)

    n = input('Please enter a non-negative integer or type stop: ')
    if n=="stop":
        return None
    else:
        n = int(n);
        tstart = time.process_time()
        print( "fib({}) = {}".format(n,fibo(n)) );
        tend = time.process_time()
        print( "average runtime: {} seconds".format(tend-tstart) );
        fib()
        return None
