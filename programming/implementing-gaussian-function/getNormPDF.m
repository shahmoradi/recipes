function pdf = gauss(x, mu, sig)
    pdf = exp(-.5*((x - mu)/sig)^2) / (sqrt(2*pi)*sig);
end