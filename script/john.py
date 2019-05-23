import hashlib
import argparse
from argon2 import PasswordHasher
ph = PasswordHasher()

parser = argparse.ArgumentParser()
parser.add_argument("filename", type=str)
parser.add_argument("hash", type=str)

args = parser.parse_args()

with open(args.filename) as fp:
    found_password = False
    for line in fp:
        l = line.replace("\n", "")
        try:
            ph.verify(args.hash, l)
            print("The password you are looking for is :")
            print(l)
            found_password = True
            break
        except:
            pass
    if not found_password:
        print("The password was not found for hash : ")
        print(args.hash)
