function OutVec = convertTempVec(InVec,str)
    if strcmp(str,'C2F')
        OutVec = (9.0/5.0)*InVec + 32.0;
    elseif strcmp(str,'F2C')
        OutVec = (5.0/9.0)*(InVec - 32.0);
    else
        error(['the requested conversion ',str,' is not supported. Program aborted.']);
    end
end