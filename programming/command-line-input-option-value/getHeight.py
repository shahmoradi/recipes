#!/usr/bin/env python

# Check if the keyword "file" is among input arguments and if so, read the contents from the file instead.

import os
import sys

for i in range(1, len(sys.argv[1:])+1, 2):
    if sys.argv[i] == "file":
        if os.path.isfile(sys.argv[i+1]):
            with open(sys.argv[i+1],"r") as inputFile: inputList = inputFile.read().replace("\n"," ").split(" ")
            while("" in inputList): inputList.remove("")
            print(inputList)
            break
        else:
            raise Exception("The input value for keyword file is not a path to a file: {}".format(sys.argv[i+1]))
else:
    inputList = sys.argv[1:]

# Parse the input arguments

option = dict()

for i in range(0, len(inputList), 2):
    if inputList[i] != "unit":
        option[inputList[i]] = float(inputList[i+1])
    else:
        option[inputList[i]] = inputList[i+1]

# setup default values

if "initHeight" not in option.keys(): option["initHeight"] = 0
if "initVelocity" not in option.keys(): option["initVelocity"] = 0
if "unit" not in option.keys(): option["unit"] = "SI"
if "gravityConstant" not in option.keys():
    if option["unit"] == "SI": option["gravityConstant"] = -10
    elif option["unit"] == "English": option["gravityConstant"] = -32.17405
    else:
        raise Exception("Invalid input unit \"{}\" detected. Possible values are: \"SI\" and \"English\"".format(option["unit"]))

#unit  = "SI"
#initHeight = 0
#initVelocity = 0
#time = 3
#gravityConstant = -1.62

finalHeight = option["initHeight"] \
            + option["initVelocity"] * option["time"] \
            + 0.5 * option["gravityConstant"] * option["time"]**2

print("\nFinal Height = {} in {} units.\n".format(finalHeight,option["unit"]))

