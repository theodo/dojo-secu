import hashlib
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("filename", type=str)
parser.add_argument("hash", type=str)

args = parser.parse_args()

with open(args.filename) as fp:
    for line in fp:
        l = line.replace("\n", "")
        hash = hashlib.sha1()
        hash.update(l)
        if hash.hexdigest() == args.hash:
            print(l)
            break

