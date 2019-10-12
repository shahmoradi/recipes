import time

def fib():

    def getFib(n_int):
        if n_int > 1:
            fib = getFib(n_int-1) + getFib(n_int-2);
        elif n_int == 1:
            fib = 1
        else:
            fib = 0
        return fib

    n = input('Please enter a non-negative integer or type stop: ')
    if n=="stop":
        return None
    else:
        n = int(n);
        tstart = time.process_time()
        print( "fib({}) = {}".format(n,getFib(n)) );
        tend = time.process_time()
        print( "average runtime: {} seconds".format(tend-tstart) );
        fib()
        return None
