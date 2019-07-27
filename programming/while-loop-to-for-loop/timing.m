InVec = randi(100,1,10^7);
disp(['Timing for convertTempVec: '  , num2str(timeit(@()convertTempVec(InVec,'C2F'))), ' seconds.'   ]);
disp(['Timing for convertTempFor: '  , num2str(timeit(@()convertTempVec(InVec,'C2F'))), ' seconds.'   ]);
disp(['Timing for convertTempWhile: ', num2str(timeit(@()convertTempWhile(InVec,'C2F'))), ' seconds.' ]);