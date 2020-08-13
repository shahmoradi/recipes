%clc;
%clear all;
%close all;
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

% output file header
cHeader = {'variable1' 'variable2'}; %dummy header
commaHeader = [ cHeader ; repmat({','},1,numel(cHeader)) ]; %insert commaas
commaHeader = commaHeader(:)';
textHeader = cell2mat(commaHeader); %cHeader in text with commas

rho = 0.6;
dataGenEnabled = false;
dataWriteEnabled = false;
if dataGenEnabled

    mvndev = mvnrnd([0,0],[1,rho;rho,1],10000);
    mvndev = exp(mvndev);

    if dataWriteEnabled

        %write header to file
        fid = fopen('data.csv','w'); 
        fprintf(fid,'%s\n',textHeader);
        fclose(fid);

        %write data to end of file
        dlmwrite('dataFull.csv',mvndev,'-append');

    end

else

    mvndev = csvread("dataFull.csv",1);

end

threshSlope = 1.5;
threshIntercept = 0.;

thresh = getThresh(mvndev(:,1), threshSlope, threshIntercept);
Mask = mvndev(:,2) > thresh;
observedData = mvndev( Mask , : );
censoredData = mvndev( ~Mask , : );
observedDataMin = min(observedData(:));
observedDataMax = max(observedData(:));
threshLineX = observedDataMin:0.1:observedDataMax;
threshLineY = getThresh(threshLineX, threshSlope, threshIntercept);

%write header to file
fid = fopen('data.csv','w'); 
fprintf(fid,'%s\n',textHeader);
fclose(fid);
dlmwrite("data.csv",observedData,'-append');

markerSize = 3;
fontSize = 13;

for i = 1:2

    figure("color","white"); hold on; box on;
        s1 = scatter( observedData(:,1) ...
                    , observedData(:,2) ...
                    , markerSize ...
                    , 'red' ...
                    , '.' ...
                    );
        s2 = scatter( censoredData(:,1) ...
                    , censoredData(:,2) ...
                    , markerSize ...
                    , 'black' ...
                    , '.' ...
                    , 'MarkerFaceColor', 'black' ...
                    , 'MarkerEdgeColor', 'black' ...
                    );
        s2.MarkerFaceAlpha = .2;
        s2.MarkerEdgeAlpha = .2;

        plot( threshLineX ...
            , threshLineY ...
            , "linewidth", 1.5 ...
            , "color", "black" ...
            )
        xlim([0.5*observedDataMin,2.0*observedDataMax]);
        ylim([0.5*observedDataMin,2.0*observedDataMax]);
        xlabel("variable1","fontSize",fontSize);
        ylabel("variable2","fontSize",fontSize);

        legend(["observed data","missing data","detection threshold"],"fontSize",fontSize,"location","southeast");
        if i==1
            filename = "data.png";
        else
            filename = "logdata.png";
            set(gca,'xscale','log','yscale','log');
        end
        set(gca,"color","white");
        export_fig(filename,"-m4 -transparent")
    hold off;

end
