def fib(n):

    def fibo(n_int):
        if n_int==0: return 0
        elif n_int==1: return 1
        else:
            return fibo(n_int-1) + fibo(n_int-2)

    if n=='stop':
        return None
    elif not str(n).isdigit():    # Make sure n is integer, if not then
        print( 'The input argument {} is not a non-negative integer!'.format(n) )    
        n = input("Please enter an integer: ")  # Note that n is read as string!
        return fib(n)
    else:
        n=int(n) 
        print('Fib({}) = {}'.format(n,fibo(n)))
        n = input("Please enter another integer or type stop: ")  # Note that n is read as string!
        return fib(n)