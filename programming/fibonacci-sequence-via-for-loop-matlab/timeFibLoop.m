function output = timeFibLoop(n)

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
            fibSeq = zeros(n_int+1,1);
            fibSeq(1) = 0;
            fibSeq(2) = 1;
            for iseq = 3:n_int+1
                fibSeq(iseq) = fibSeq(iseq-1) + fibSeq(iseq-2);
            end
            fib = fibSeq(n_int+1);
        end
    end

end