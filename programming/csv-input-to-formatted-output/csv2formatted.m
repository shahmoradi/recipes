function  csv2formatted(inputFileName,outputFileName)
    d = csvread(inputFileName);
    fileID = fopen(outputFileName,'w');
    for irow = 1:length(d(:,1))
        fprintf(fileID,'%14.3f',d(irow,:));
        fprintf(fileID,'\n');
    end
    fclose(fileID);
end