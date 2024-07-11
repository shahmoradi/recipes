function [G] = genFunc(varargin)
    switch nargin
        case 0
            a=0;
            b=0;
            c=0;
        case 1
            a=varargin{1};
            b=0;
            c=0;
        case 2
            a=varargin{1};
            b=varargin{2};
            c=0;
        case 3
            a=varargin{1};
            b=varargin{2};
            c=varargin{3};
        otherwise
            error('Too many arguments')   
    end

    function [y] = evalFunc(x)
        y = a*x.^2 + b*x + c;
    end
    G = @evalFunc;
end