from flask import Flask
from flask import request
import requests
import json

app = Flask(__name__)

def intersection(lst1, lst2): 
    lst3 = [value for value in lst1 if value in lst2] 
    return lst3

def bigthing_to_list(bigthing):
    result = []
    for dictionary in bigthing:
        result.append(dictionary["word"])
    return result


@app.route('/pun')
def makepun():
    sentence = str(request.args.get('sentence'))
    word = str(request.args.get('word'))
    wordsynparam = {"rel_syn":word}
    wordsyn = requests.get("https://api.datamuse.com/words", params=wordsynparam)
    wordsynlist = bigthing_to_list(wordsyn.json())
    #print(wordsynlist)
    
    suggestions = []
    otherwordrellist = []
    for otherword in sentence.split():
        if otherword != word:
            otherwordrelparam = {"ml":otherword}
            otherwordrel = requests.get("https://api.datamuse.com/words", params=otherwordrelparam)
            otherwordrellist += bigthing_to_list(otherwordrel.json())
            
            otherwordhom = requests.get("https://api.datamuse.com/words", params={"sl":otherword})
            otherwordrellist += bigthing_to_list(otherwordhom.json())

            otherwordsp = requests.get("https://api.datamuse.com/words", params={"sp":otherword})
            otherwordrellist += bigthing_to_list(otherwordsp.json())
            
            otherwordtrg = requests.get("https://api.datamuse.com/words", params={"rel_trg":otherword})
            otherwordrellist += bigthing_to_list(otherwordtrg.json())

            otherwordsyn = requests.get("https://api.datamuse.com/words", params={"rel_syn":otherword})
            otherwordrellist += bigthing_to_list(otherwordsyn.json())

            for i in wordsynlist:
                if i in otherword or otherword in i:
                    suggestions += i

            suggestions += intersection(otherwordrellist, wordsynlist)
            #print(otherwordrellist)

    punsentences = []
    for suggestion in suggestions:
        pun = []
        for wordo in sentence.split():
            if wordo == word:
                pun.append(suggestion)
            else:
                pun.append(wordo)
        punstring = " ".join(pun)
        if punstring != sentence:
            if punstring not in punsentences:
                punsentences.append(punstring)

    # return punsentences
    return json.dumps({
        'punsentences': punsentences,
        'suggestions': suggestions
    })
