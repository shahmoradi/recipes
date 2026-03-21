close all;
load('./data3D.mat');

nrow = round(sqrt(length(data(1,1,:))));
ncol = nrow;

marginTop = 0.06;
marginBottom = 0.12;
marginLeft = 0.08;
marginRight = 0.1;
subplotInterspace = 0.03; % space between subplots
subplotWidth = (1-marginLeft-marginRight)/ncol - subplotInterspace;
subplotHeight = (1-marginTop-marginBottom)/nrow - subplotInterspace;
mainPlotPositionX = 0.05;
mainPlotPositionY = 0.08;
mainPlotWidth = 1 - marginRight - mainPlotPositionX;
mainPlotHeight = 1 - 0.05 - mainPlotPositionY;
mainPlotTitleFontSize = 12;
mainPlotAxisFontSize = 12;
subPlotFontSize = 10;

colorbarPositionX = 1-marginRight; %+subplotInterspace; % x position of colorbar
%colorbarPositionY = 1-marginBottom; % x position of colorbar
colorbarWidth = 0.03;
colorbarHeight = nrow*(subplotHeight+subplotInterspace)-subplotInterspace; %1-marginTop-marginBottom-subplotInterspace;
colorbarFontSize = 13;
ColorLimits = [0,max(max(max(data(:,:,:))))];

figure( 'Position', [0, 0, 900, 1350] ...
      ..., 'visible','off' ...
      ..., 'Color','none' ...
      );

mainPlot = axes( 'position' ...
               , [mainPlotPositionX mainPlotPositionY mainPlotWidth mainPlotHeight] ...
               , 'Xlim',[0 1], 'Ylim',[0 1] ...
               , 'Color', 'none' ...
               );
mainPlot.XTick = [];
mainPlot.YTick = [];
mainPlot.XAxis.Visible = 'off';
mainPlot.YAxis.Visible = 'off';
mainPlot.XLabel.Visible = 'on';
mainPlot.YLabel.Visible = 'on';
mainPlot.XLabel.String = 'Voxel Number in X Direction';
mainPlot.YLabel.String = 'Voxel Number in Y Direction';
mainPlot.Title.String = ['A beautiful design of ',sprintf('%0.1f',nrow),' x ',sprintf('%0.1f',ncol),' subplots using MATLAB'];
mainPlot.XLabel.FontSize = mainPlotAxisFontSize;
mainPlot.YLabel.FontSize = mainPlotAxisFontSize;
mainPlot.Title.FontSize = mainPlotTitleFontSize;
for irow = nrow:-1:1
    for icol = 1:ncol
        sliceNumber = (nrow-irow)*nrow+icol;
        subPlot = axes( 'position', [ ...
                                                   (icol-1)*(subplotInterspace+subplotWidth) + marginLeft ...
                                                   (irow-1)*(subplotInterspace+subplotHeight) + marginBottom ...
                                                   subplotWidth ...
                                                   subplotHeight ...
                                                 ] ...
                                   );
        imagesc(data(:,:,sliceNumber),ColorLimits);
        hold on;
        
        % plot the boundaries
        Bcell = getBoundary(data(:,:,sliceNumber)); % get the boundaries of the tumor regions
        for ib = 1:length(Bcell)
            plot( Bcell{ib}(:,2) ...
                , Bcell{ib}(:,1) ...
                , 'color', 'red' ...
                , 'linewidth', 4 ...
            )
        end

        subPlot.FontSize = subPlotFontSize;
        if icol ~= 1
            subPlot.YTickLabels = [];
        end
        if irow ~= 1
            subPlot.XTickLabels = [];
        end
        subPlot.Title.String = ['z = ', num2str(sliceNumber)];
        subPlot.CLim = ColorLimits;
    end
end
axes(mainPlot);
caxis(ColorLimits);
cbar = colorbar;
ylabel(cbar,'Number of Tumor Cells');
cbar.Position = [ colorbarPositionX ...
                  marginBottom ...
                  colorbarWidth ...
                  colorbarHeight ...
                  ];
cbar.FontSize = colorbarFontSize; 

saveas(gcf,'subplotsWithTumorBoundaries.png')