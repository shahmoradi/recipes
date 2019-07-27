#!/usr/bin/env python
import sys, os

residue_max_acc = {'A': 129.0, 'R': 274.0, 'N': 195.0, 'D': 193.0, \
                   'C': 167.0, 'Q': 225.0, 'E': 223.0, 'G': 104.0, \
                   'H': 224.0, 'I': 197.0, 'L': 201.0, 'K': 236.0, \
                   'M': 224.0, 'F': 240.0, 'P': 159.0, 'S': 155.0, \
                   'T': 172.0, 'W': 285.0, 'Y': 263.0, 'V': 174.0}
    
def main():
    if len( sys.argv ) != 3:
        print('''
 
Usage:''')
        print("     ", sys.argv[0], "<input dssp file>", "<output summary file>", '\n')
        sys.exit('Program aborted.\n')
    else:
        dssp_in = sys.argv[1]  # path for the output dssp file to be read
        sum_out = sys.argv[2]   # summary file containing all residue DSSP-property data

    # Now check if the output summary file already exists. If so, then append data for the new pdb to the data already in the file.
    if os.path.isfile(sum_out):
       sum_out_file = open(sum_out,'a')
    else:
       sum_out_file = open(sum_out,'w')
       sum_out_file.write('pdb' + '\t' + 'name' + '\t' + 'ACC' + '\t' + 'RSA' + '\n')
    
    input = open(dssp_in, 'r')
    fileContents = input.readlines()   # This is a list containing each line of the input file as an element.
    pdb_name = dssp_in[-11:-5]
    
    resnam = []     # A list containing all Residue Names
    acc = []        # A list containing all normalized residue acc values in the pdb file
    rsa = []        # A list containing all normalized residue acc values in the pdb file
    counter = 0
    for record in fileContents[25:len(fileContents)]:
        AA = record[13]
        if AA != ('!' or '*'):
            counter += 1
            resnam.append(AA)
            acc.append(record[35:39])
            rsa.append(float(record[35:39])/residue_max_acc[AA])
            
    input.close()
    
    # Now write out (or append to) the ouput file
    for (i,j) in enumerate(rsa):
        sum_out_file.write(pdb_name + '\t' + resnam[i] + '\t' + acc[i] + '\t' + str(rsa[i]) + '\n')
    
    return

if __name__ == "__main__":
   main()