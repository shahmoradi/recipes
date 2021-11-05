%clc;
clear all;
close all;
%clear classes;
format compact; format long;

filePath = mfilename('fullpath');
[currentDir,fileName,fileExt] = fileparts(filePath); cd(currentDir);
cd(fileparts(mfilename('fullpath'))); % Change working directory to source code directory.
addpath(genpath("../../../../libmatlab"),"-begin");

% set path to the ParaMonte library

%%%%%%%%%%%%% IMPORTANT %%%%%%%%%%%%%

pmlibRootDir = './'; % change this path to the ParaMonte library root directory

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

addpath(genpath(pmlibRootDir));

% change MATLAB's working directory to the folder containing this script

filePath = mfilename('fullpath');
[currentDir,fileName,fileExt] = fileparts(filePath); cd(currentDir);
cd(fileparts(mfilename('fullpath'))); % Change working directory to source code directory.

cHeader = {'variable'}; %dummy header
textHeader = cell2mat(cHeader); %cHeader in text with commas

dataGenEnabled = false;
dataWriteEnabled = false;
if dataGenEnabled

    gdev = normrnd(0,1,20000,1);
    gdev = exp(gdev);

    if dataWriteEnabled

        %write header to file
        fid = fopen('dataFull.csv','w'); 
        fprintf(fid,'%s\n',textHeader);
        fclose(fid);

        %write data to end of file
        dlmwrite('dataFull.csv',gdev,'-append');

    end

else

    gdev = csvread("dataFull.csv",1);

end

thresh = 2;

Mask = gdev(:) < thresh;
observedData = gdev(Mask);
censoredData = gdev(~Mask);

%write header to file
fid = fopen('data.csv','w'); 
fprintf(fid,'%s\n',textHeader);
fclose(fid);

%write data to end of file
dlmwrite('data.csv',observedData);

markerSize = 3;
fontSize = 13;

for i = 1:2

    figure("color","white"); hold on; box on;
        if i==1
            odata = observedData;
            cdata = censoredData;
            tdata = thresh;
        else
            odata = log(observedData);
            cdata = log(censoredData);
            tdata = log(thresh);
        end
        h1 = histogram  ( odata ...
                        , "FaceColor", "red" ...
                        , "EdgeColor", "none" ...
                        );
        h2 = histogram  ( cdata ...
                        , "FaceColor", "black" ...
                        , "EdgeColor", "none" ...
                        , "FaceAlpha", 0.3 ...
                        );
        h2.BinWidth = h1.BinWidth;
        xline   ( tdata ...
                , "linewidth", 1.5 ...
                , "color", "black" ...
                );
        if i==1
            xlim([0 10]);
            xlabel("Variable","fontSize",fontSize);
        else
            xlim([-4 5.5]);
            xlabel("Log( Variable )","fontSize",fontSize);
        end
        ylabel("Count","fontSize",fontSize);
        legend(["observed data","missing data","detection threshold"],"fontSize",fontSize,"location","northeast");
        if i==1
            filename = "data.png";
        else
            filename = "logdata.png";
            %set(gca,'xscale','log','yscale','log');
        end
        set(gca,"color","white");
        export_fig(filename,"-m4 -transparent")
    hold off;

end
