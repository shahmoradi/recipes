function polstruct = getPolar(inputCartesianStruct)
    if ~(isfield(inputCartesianStruct,'x') && isfield(inputCartesianStruct,'y'))
        disp('Invalid argument!');
        return;
    end
    r = sqrt(inputCartesianStruct.x^2 + inputCartesianStruct.y^2);
    phi = atan(inputCartesianStruct.y/inputCartesianStruct.x);
    polstruct = struct('r',r,'phi',phi);
end