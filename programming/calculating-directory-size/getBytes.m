function totalSize = getBytes(path)
    s = dir(path);
    totalSize = sum([s(1:end).bytes]);
end