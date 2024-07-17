function fib()

    n = input('Please enter a non-negative integer or type stop: ','s');
    if strcmp(n,'stop')
        return
    else
        n = str2double(n);
        if isreal(n)
            if n>=0 && round(n)==n
                disp(['fib(',num2str(n),') = ',num2str(getFib(n))]);
                fib()
                return
            end
        end
        disp('The input argument is not a non-negative integer!');
        fib()
    end

    function fib = getFib(n_int)
        if n_int > 1
            fib = getFib(n_int-1) + getFib(n_int-2);
        elseif n_int == 1
            fib = 1;
        else
            fib = 0;
        end
    end

end