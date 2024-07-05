clear all;
close all;
load('Drand.mat');
global data
data = Drand;
Parameters = fminsearch(@getLogProbNorm,[1,10]);
disp( ['mu: ', num2str(Parameters(1)), ' , sigma: ', num2str(Parameters(2))] );