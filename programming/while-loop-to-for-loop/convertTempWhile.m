function OutVec = convertTempWhile(InVec,str)
    i = 1;
    OutVec = zeros(size(InVec));
    if strcmp(str,'C2F')
        while i <= length(InVec)
            OutVec(i) = (9.0/5.0)*InVec(i) + 32.0;
            i = i + 1;
        end
    elseif strcmp(str,'F2C')
        while i <= length(InVec)
            OutVec(i) = (5.0/9.0)*(InVec(i) - 32.0);
            i = i + 1;
        end
    else
        error(['the requested conversion ',str,' is not supported. Program aborted.']);
    end
end