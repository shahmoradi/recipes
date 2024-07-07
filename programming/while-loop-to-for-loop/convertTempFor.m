function OutVec = convertTempFor(InVec,str)
    OutVec = zeros(size(InVec));
    if strcmp(str,'C2F')
        for i = 1:length(InVec)
            OutVec(i) = (9.0/5.0)*InVec(i) + 32.0;
        end
    elseif strcmp(str,'F2C')
        for i = 1:length(InVec)
            OutVec(i) = (5.0/9.0)*(InVec(i) - 32.0);
        end
    else
        error(['the requested conversion ',str,' is not supported. Program aborted.']);
    end
end