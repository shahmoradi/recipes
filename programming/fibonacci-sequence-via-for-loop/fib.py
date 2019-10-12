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
        print( "fib({}) = {}".format(n,getFib(n)) );
        fib()
        return None
