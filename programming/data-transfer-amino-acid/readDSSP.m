function readDSSP( inputFileName, outputFileName )

    residue_max_acc.A = 129.0;
    residue_max_acc.R = 274.0;
    residue_max_acc.N = 195.0;
    residue_max_acc.D = 193.0;
    residue_max_acc.C = 167.0;
    residue_max_acc.Q = 225.0;
    residue_max_acc.E = 223.0;
    residue_max_acc.G = 104.0;
    residue_max_acc.H = 224.0;
    residue_max_acc.I = 197.0;
    residue_max_acc.L = 201.0;
    residue_max_acc.K = 236.0;
    residue_max_acc.M = 224.0;
    residue_max_acc.F = 240.0;
    residue_max_acc.P = 159.0;
    residue_max_acc.S = 155.0;
    residue_max_acc.T = 172.0;
    residue_max_acc.W = 285.0;
    residue_max_acc.Y = 263.0;
    residue_max_acc.V = 174.0;

    File.Input.name = inputFileName; % '1A2T_A.dssp'
    File.Output.name = outputFileName; % 'readDSSP_output_MATLAB.txt'

    % get the PDB name from the input file's name
    pdb_name = File.Input.name(1:6);

    % read all of the input file contents as a single string variable
    File.Input.contents = fileread( File.Input.name );

    % split the single string variable to a cell array each element of which
    % corresponds to a line in the input file
    File.Input.Line = strsplit( File.Input.contents, '\n' );

    % first allocate all the arrays to the maximum possible size to save
    % computational time by avoiding repeated allocation / deallocation of the
    % same variable
    File.Output.Result.AA = strings(length(File.Input.Line),1); % array containing the Amino Acid names
    File.Output.Result.ACC = zeros(length(File.Input.Line),1); % array containing the ACCessible surface areas
    File.Output.Result.ACC = zeros(length(File.Input.Line),1); % array containing the ACCessible surface areas

    % iterate over the lines of the input file
    counter = 0;
    for rowCell = File.Input.Line(26:length(File.Input.Line))
        row = rowCell{1};
        if ~isempty(row)
            if ~strcmp(row(14),'!')
                counter = counter + 1;
                File.Output.Result.AA(counter) = row(14);
                File.Output.Result.ACC(counter) = str2double(row(36:39));
                % compute the fractional/relative solvent accessible area
                File.Output.Result.RSA(counter) = File.Output.Result.ACC(counter) / residue_max_acc.(File.Output.Result.AA{counter});
            end
        end
    end

    % Now resize all the arrays to remove empty array elements
    File.Output.Result.AA = File.Output.Result.AA(1:counter);
    File.Output.Result.ACC = File.Output.Result.ACC(1:counter);
    File.Output.Result.RSA = File.Output.Result.RSA(1:counter);

    % now open the output file and check if the file already exists
    if exist(File.Output.name,'file')
        % the file already exists, so open it to append new data
        File.Output.id = fopen( File.Output.name, 'a' );
    else
        % the file does not exist, so open it to write new data
        File.Output.id = fopen( File.Output.name, 'w' );
    end

    % write the output file as a CSV (comma-separated-variable) file
    % write the output file's header
    fprintf( File.Output.id, "pdb,AA,ACC,RSA\n"); % \n stands for the new line character
    for i = 1:length(File.Output.Result.AA)
        fprintf ( File.Output.id ...
                , "%s,%s,%.0f,%.4f\n" ...
                , pdb_name ...
                , File.Output.Result.AA(i) ...
                , File.Output.Result.ACC(i) ...
                , File.Output.Result.RSA(i) ...
                );
    end
    fclose(File.Output.id);

end