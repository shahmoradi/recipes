import os
import numpy as np
import pandas as pd
import urllib.request
from pathlib import Path
import matplotlib.pyplot as plt

###############################################################################

def download(url,filePath):
    import urllib.request
    import shutil
    with urllib.request.urlopen(url) as response, open(filePath, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)
    return None

###############################################################################

def fetchTriggersFromWeb( filePath = "./triggers.txt"
                        , url = "https://raw.githubusercontent.com/cdslaborg/DataRepos_SwiftBat/master/triggers.txt"
                        ):
    download(url,filePath)
    return filePath
    #triggerList = pd.read_csv(url)
    #triggerList.to_csv('trigger.txt')

###############################################################################

def readTriggers(filePath = "./triggers.txt"): 
    return pd.read_csv(filePath,header=None,dtype="str")

###############################################################################

def fetchGrbDataFromWeb(df, url = "https://cdslaborg.github.io/DataRepos_SwiftBat/ep_flu/"):

    rootPath = os. getcwd() # os.path.dirname(os.path.abspath(__file__))
    outDir = os.path.join(rootPath,"data")

    print("generating the data download directory on your system: " + outDir)
    if os.path.exists(outDir):
        print("the data download directory already exists on your system. skipping...")
    else:
        print("generating the data download directory: " + outDir)
        os.mkdir(outDir)

    counter = 0
    missing = 0
    for index, row in df.iterrows():
        counter += 1
        trigger = row[0]
        fileName = "GRB" + trigger + "_ep_flu.txt"
        weblink = url + fileName
        filePath = os.path.join(outDir,fileName)
        try:
            if os.path.exists(filePath):
                print(filePath + " already exists on your system. skipping the download...")
            else:
                download(weblink,filePath)
        except urllib.request.HTTPError:
            missing += 1
            print('\nurl: {} does not exist.'.format(weblink))
            print('file for GRB ID: {} is missing. {} files missing out of {} event so far.'.format(trigger,missing,counter))

    print('\nmission accomplished. total downloads: {}, missing files: {}\n'.format(counter,missing))

###############################################################################

def plotBatFiles(inPath = "data",figFile = "SwiftDataPlot.png"):
    ax = plt.gca()
    ax.set_xlabel(r"Fluence [ ergs/cm$^2$ ]")
    ax.set_ylabel(r"Epeak [ keV ]")
    ax.axis([1.0e-8, 1.0e-1, 1.0, 1.0e4]) # [xmin, xmax, ymin, ymax]
    ax.set_yscale('log')
    ax.set_xscale('log')
    counter = 0
    for file in os.listdir(inPath):
        if file.endswith("ep_flu.txt"):
            data = np.loadtxt(os.path.join(inPath, file), skiprows=1)
            if data.size!=0 and all(data[:,1]<0.0):
                counter += 1
                if counter%100==0 : print('Fetching file # {}: {}'.format(counter,file))
                data[:,1] = np.exp(data[:,1])
                #colors = np.full(data[:,1].size,np.random.rand())
                ax.scatter(data[:,1],data[:,0],s=1,alpha=0.05,c='r',edgecolors='none')
    ax.set_title('Plot of Epeak vs. Fluence for {} Swift GRB events'.format(counter))
    plt.savefig(figFile)
    plt.show()

###############################################################################

def main():

    fetchTriggersFromWeb()
    df = readTriggers()
    fetchGrbDataFromWeb(df)
    plotBatFiles()

if __name__ == "__main__":
   main()
