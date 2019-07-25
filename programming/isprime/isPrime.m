function outLogical = isPrime(n)

    divisor = 2;
    outLogical = true;
    sqrt_n = round(sqrt(n));
    outLogical = isDivisible(n,sqrt_n,divisor);

    function output = isDivisible(n,sqrt_n,divisor)
        if mod(n,divisor) == 0
            output = false;
        elseif sqrt_n<divisor
            output = true;
            return
        else
            divisor = divisor + 1;
            output = isDivisible(n,sqrt_n,divisor);
        end
    end

end