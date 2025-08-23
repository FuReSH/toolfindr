#!/usr/bin/python3.13

import sys
import os

def readFile(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def compare_files(file1, file2):
    content1 = readFile(file1)
    content2 = readFile(file2)

    lines1 = content1.splitlines()
    lines2 = content2.splitlines()
    
    linesSet1 = set(content1.splitlines())
    linesSet2 = set(content2.splitlines())

    #print(len(lines1))
    #print(len(lines2))
    #print(lines1.intersection(lines2))
    #print(len(lines1.difference(lines2)))

    # Create a list of duplicates using list comprehension
    linesDuplicates1 = [i for i in linesSet1 if lines1.count(i) > 1]
    print(linesDuplicates1)

    linesDuplicates2 = [i for i in linesSet2 if lines2.count(i) > 1]
    print(linesDuplicates2)

if __name__ == "__main__":

    if len(sys.argv) < 2:
        print("Usage:\n\tcompareLists.py [filepath_1] [filepath_2]")
        print ("Arg no = %s" % len(sys.argv))
        sys.exit(0)
    
    filepath_1 = sys.argv[1]
    filepath_2 = sys.argv[2]
    
    if not os.path.exists(filepath_1) or not os.path.exists(filepath_2):
        print ('Failed to load list files from directory. Does not exist.')
        exit(-1)

    compare_files(filepath_1, filepath_2)
    print("\nComparison complete.")
