%rng('shuffle');
rng(1235);
nExperiments=100000; % the number of times the experiment is simulated
TotalWinsWithoutSwitch = 0;
TotalWinsWithSwitch = 0;
AllDoors = [1,2,3];
averageNumberOfWinsWithoutSwitch = zeros(nExperiments,1);
averageNumberOfWinsWithSwitch = zeros(nExperiments,1);

for iExperiment = 1:nExperiments
        
    if mod(iExperiment,10000)==0; disp(['simulating experiment number ', num2str(iExperiment)]); end
    
    ContainsCar = zeros(3,1); % first create the three doors, assuming none contains the car, hence all are zero valued.
    doorWithCar = randi([1,3],1,1); % Now put the car behind one of the three doors randomly.
    myChoice = randi([1,3],1,1); % Now make a choice of door randomly.
    
    excludedDoor = AllDoors(AllDoors~=doorWithCar & AllDoors~=myChoice); % find which door should be opened by the host
    if length(excludedDoor)>1
        excludedDoor = excludedDoor(randi([1,2])); % pick one of the empty doors randomly
    end
    
    % find the chance of winning by no door switching
    if myChoice==doorWithCar
        TotalWinsWithoutSwitch = TotalWinsWithoutSwitch + 1;
    end
    
    % find the chance of winning by door switching
    myChoice = AllDoors(AllDoors~=myChoice & AllDoors~=excludedDoor); % update my choice to the alternative door after host's exclusion of one of the doors.
    if myChoice==doorWithCar
        TotalWinsWithSwitch = TotalWinsWithSwitch + 1;
    end
    
    averageNumberOfWinsWithoutSwitch(iExperiment) = TotalWinsWithoutSwitch / iExperiment;
    averageNumberOfWinsWithSwitch(iExperiment) = TotalWinsWithSwitch / iExperiment;

end

% Now draw and export figures

figure('visible','on'); hold on; box on;
plot( averageNumberOfWinsWithoutSwitch ...
    , 'color', 'blue' ...
    , 'linewidth', 1.5 ...
    );
plot( averageNumberOfWinsWithSwitch ...
    , 'color', 'red' ...
    , 'linewidth', 1.5 ...
    );
axis([0,nExperiments,0,1]);
line1 = line( [1 nExperiments], [0.66666666 0.66666666] ...
            , 'LineStyle', '--' ...
            , 'color','green' ...
            , 'LineWidth',1.5 ...
            );
line2 = line( [1 nExperiments], [0.33333333 0.33333333] ...
            , 'LineStyle','--' ...
            , 'color','green' ...
            , 'LineWidth',1.5 ...
            );
xlabel('Experiment Repeat Number');
ylabel('Average Probability of Winning');

% add legend to figure
legend( {'No Door Switch','With Door Switch','theoretical prediction','theoretical prediction'} ...
      , 'Location', 'southeast' ...
      );
uistack(line1,'bottom');
uistack(line2,'bottom');

set(gca,'xscale','log');

set( gca ...
   , 'XMinorTick','on','YMinorTick','on' ...
   , 'FontSize', 13 ...
   , 'LineWidth', 1.25 ...
   );

saveas(gcf,'MontyGameResult.png');

%close(gcf);
