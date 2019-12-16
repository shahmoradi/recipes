clear all
close all

Temp = importdata('usaTemperatureHistory.txt', ' ',70);

figure(1)
plot( Temp.data(:,1) + Temp.data(:,2) / 13.0 ...
    , Temp.data(:,3) ...
    , 'linewidth', 0.75 ...
    );

xlabel('Year');
ylabel('Temperature (Celsius)');
title('Global Land Temperature Anomaly vs. 1951-1980 Average');
saveas(figure(1),'GlobalLandTemperatureAnomaly.png')

startRow = 2700; % corresponding to year 1970
ndata = length(Temp.data(startRow:end,1));
DataSet = zeros(ndata,2);
DataSet(:,1) = Temp.data(startRow:end,1) + Temp.data(startRow:end,2) / 13.0;
DataSet(:,2) = Temp.data(startRow:end,3);

linearFit = fitlm(DataSet(:,1),DataSet(:,2));

hold on;
XValues = [1700:0.01:2050];
YValues = linearFit.Coefficients.Estimate(1) + linearFit.Coefficients.Estimate(2) * XValues;
plot( XValues, YValues ...
    , 'color','red' ...
    ,'linewidth',2 ...
    )
hold off;
saveas(figure(1),'GlobalLandTemperatureAnomaly2050.png')

