
% define URL variables
dataReposUrl = ['https://cdslaborg.github.io/DataRepos_SwiftBat/'];

% create data directory
dataDirectory = 'ep_flu/';
mkdir(dataDirectory);

% read the list event IDs
triggerList = webread([dataReposUrl,'triggers.txt'], 'ContentType' , 'text');
triggerList = strsplit(triggerList,'\n')';

missingFileCounter = 0;
for i = 1:length(triggerList)
    filename = ['GRB',triggerList{i},'_ep_flu.txt'];
    myUrl = [dataReposUrl,'ep_flu',filename];
    disp(['Fetching file ',filename,'...']);
    try
        data = webread(myUrl);
    catch
        missingFileCounter = missingFileCounter + 1;
        warning('file not found');
        continue;
    end
    fid = fopen([dataDirectory,filename],'w');
    fprintf(fid,'%s',data);
    fclose(fid);
end

disp(['There were a total of ', num2str(missingFileCounter), ' files missing in this repository.']);