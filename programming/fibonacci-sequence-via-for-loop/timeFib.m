function output = timeFib(n)

    if ~ischar(n) && isreal(n) && n>=0 && round(n)==n
        output.n = n;
        output.fib = getFib(n);
        output.runtime = timeit( @()getFib(n) );
    else
        error('The input argument is not a non-negative integer!');
        return
    end

    function fib = getFib(n_int)
        if n_int == 0
            fib = 0;
        elseif n_int == 1
            fib = 1;
        else
            fib = getFib(n_int-1) + getFib(n_int-2);
        end
    end

end