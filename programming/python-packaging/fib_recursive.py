def fib(n_int):
    if n_int==0: return 0
    elif n_int==1: return 1
    else:
        return fib(n_int-1) + fib(n_int-2)
