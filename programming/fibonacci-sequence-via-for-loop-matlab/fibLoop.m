function fibLoop()

    n = input('Please enter a non-negative integer or type stop: ','s');
    if strcmp(n,'stop')
        return
    else
        n = str2double(n);
        if isreal(n)
            if n>=0 && round(n)==n
                disp([char(9),'fib(',num2str(n),') = ',num2str(getFib(n))]);
                runtime = timeit( @()getFib(n) );
                disp([char(9),'average runtime: ',num2str(runtime), ' seconds']);
                fibLoop()
                return
            end
        end
        disp('The input argument is not a non-negative integer!');
        fibLoop()
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