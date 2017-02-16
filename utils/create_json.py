# Pulling words from a newline separated list and into a JSON store

import json

store = dict()

for i in range(1, 11):
    filename = 'utils/words' + str(i) + '.txt'
    wordfile = open(filename, 'r')
    words = [line.strip() for line in wordfile.readlines()]
    store[i] = words

with open('words.json', 'w') as wordsjson:
    json.dump(store, wordsjson, ensure_ascii=False, indent=2, separators=(',', ': '))
    print "Successfully generated words.json"
