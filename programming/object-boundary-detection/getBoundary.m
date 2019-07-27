function BoundaryCellArray = getBoundary(InputData)
    InputDataBinary = InputData;
    InputDataBinary(InputData~=0) =1;
    BoundaryCellArray = bwboundaries(InputDataBinary);
end