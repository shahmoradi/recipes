function y = getThresh(x,slope,intrcpt)
    y = exp( slope .* log(x) + intrcpt );
end