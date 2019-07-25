function cartstruct = getCart(inputPolarStruct)
    if ~(isfield(inputPolarStruct,'r') && isfield(inputPolarStruct,'phi'))
        disp('Invalid argument!');
        return;
    end
    x = inputPolarStruct.r * cos(inputPolarStruct.phi);
    y = inputPolarStruct.r * sin(inputPolarStruct.phi);
    cartstruct = struct('x',x,'y',y);
end