List = { {'M','A','T','L','A','B'}, {' '}, {'i','s'}, {' '}, {'a'}, {' '}, {'s','t','r','a','n','g','e'}, {', '}, {'b','u','t',' '}, {'v','e','r','y'}, {' '}, {'c','a','p','a','b','l','e'}, {' '}, {'p','o','p','u','l','a','r'}, {' '}, {'p','r','o','g','r','a','m','m','i','n','g',' ','l','a','n','g','u','a','g','e','.'} };
str = '';
for i = 1:length(List)
    for j = 1:length(List{i})
        str = [str,List{i}{j}];
    end
end

disp(str);