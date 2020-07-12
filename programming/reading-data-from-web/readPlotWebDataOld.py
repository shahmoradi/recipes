#!/usr/bin/env python

import urllib.request

def parseTable(html):
    #Each "row" of the HTML table will be a list, and the items
    #in that list will be the TD data items.
    ourTable = []

    #We keep these set to NONE when not actively building a
    #row of data or a data item.
    ourTD = None    #Stores one table data item
    ourTR = None    #List to store each of the TD items in.


    #State we keep track of
    inTable = False
    inTR = False
    inTD = False

    #Start looking for a start tag at the beginning!
    tagStart = html.find("<", 0)

    while( tagStart != -1):
        tagEnd = html.find(">", tagStart)

        if tagEnd == -1:    #We are done, return the data!
            return ourTable

        tagText = html[tagStart+1:tagEnd]

        #only look at the text immediately following the <
        tagList = tagText.split()
        tag = tagList[0]
        tag = tag.lower()

        #Watch out for TABLE (start/stop) tags!
        if tag == "table":      #We entered the table!
            inTable = True
        if tag == "/table":     #We exited a table.
            inTable = False

        #Detect/Handle Table Rows (TR's)
        if tag == "tr":
            inTR = True
            ourTR = []      #Started a new Table Row!

        #If we are at the end of a row, add the data we collected
        #so far to the main list of table data.
        if tag == "/tr":
            inTR = False
            ourTable.append(ourTR)
            ourTR = None

        #We are starting a Data item!
        if tag== "td":
            inTD = True
            ourTD = ""      #Start with an empty item!
            
        #We are ending a data item!
        if tag == "/td":
            inTD = False
            if ourTD != None and ourTR != None:
                cleanedTD = ourTD.strip()   #Remove extra spaces
                ourTR.append( ourTD.strip() )
            ourTD = None
            

        #Look for the NEXT start tag. Anything between the current
        #end tag and the next Start Tag is potential data!
        tagStart = html.find("<", tagEnd+1)
        
        #If we are in a Table, and in a Row and also in a TD,
        # Save anything that's not a tag! (between tags)
        #
        #Note that this may happen multiple times if the table
        #data has tags inside of it!
        #e.g. <td>some <b>bold</b> text</td>
        #
        #Because of this, we need to be sure to put a space between each
        #item that may have tags separating them. We remove any extra
        #spaces (above) before we append the ourTD data to the ourTR list.
        if inTable and inTR and inTD:
            ourTD = ourTD + html[tagEnd+1:tagStart] + " "
            #print("td:", ourTD)   #for debugging


    #If we end the while loop looking for the next start tag, we
    #are done, return ourTable of data.
    return(ourTable)
        
def fetchHtmlTable(link,outPath):
    response = urllib.request.urlopen(link)
    html_bytes = response.read()
    html = html_bytes.decode()
    with open(outPath+link.split('/')[-1] , 'w') as fout:
        fout.write(html)
    
    dataTable = parseTable(html)
    with open(outPath+link.split('/')[-1]+'.tab' , 'w') as fout:
        for row in dataTable:
            for item in row:
                fout.write('{:>30}'.format(item))
            fout.write('\n')
    return dataTable
    
def fetchBatFiles(dataTable,outPath,fileName = 'ep_flu.txt'):  # fetch individual files in Swift repository
    root = 'https://cdslaborg.github.io/DataRepos_SwiftBat/ep_flu/' + fileName
    counter = 0
    missing = 0
    for row in dataTable:
        grb_id = row[0].split('(')[-1][:-1]
        #print(grb_id)
        try:
            counter += 1
            link = root.replace('$grb_id$',grb_id)
            response = urllib.request.urlopen(link)
            webFile_bytes = response.read()
            webFile = webFile_bytes.decode()
            with open(outPath+'/GRB'+grb_id+'_'+fileName , 'w') as fout: fout.write(webFile)
        except urllib.request.HTTPError:
            missing += 1
            print('\nurl: {} does not exist.'.format(link))
            print('file for GRB ID: {} is missing. {} files missing out of {} event so far.\n'.format(grb_id,missing,counter))
    

def plotBatFiles(inPath,figFile):
    import os
    import numpy as np, os
    import matplotlib.pyplot as plt
    ax = plt.gca()
    ax.set_xlabel('Fluence [ ergs/cm^2 ]')
    ax.set_ylabel('Epeak [ keV ]')
    ax.axis([1.0e-8, 1.0e-1, 1.0, 1.0e4]) # [xmin, xmax, ymin, ymax]
    ax.set_yscale('log')
    ax.set_xscale('log')
    plt.hold('on')
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

def main():
    import sys
    if len(sys.argv)!=3:
        print("""
        USAGE:
              ./readPlotWebData.py <web address: https://cdslaborg.github.io/DataRepos_SwiftBat/index.html> <path to output files, e,g,: ./>
              """)
    else:
        link = sys.argv[1]
        outPath = sys.argv[2]
        #fetchBatFiles( fetchHtmlTable(link,outPath) , outPath , fileName = 'ep_flu.txt')
        figFile = 'SwiftDataPlot.png'
        plotBatFiles(outPath,figFile)

if __name__ == "__main__":
   main()
