#!/usr/bin/env python3

#import futures

#with futures.ProcessPoolExecutor(max_workers=10) as executor:
#    tasks_pool = [ executor.submit(self.client.list_cluster_names, region['RegionName']) for region in regions ]
#    for future in futures.as_completed(tasks_pool):
#		region, names = future.result()
#		if names:
#			cluster_names.append({'region': region, 'names': names})

# Prerequisites:
# install gazpacho and Reverso-API: 
# pip install gazpacho
# pip install reverso-api

import json
from reverso_api.context import ReversoContextAPI
from gazpacho import get, Soup

wordToSearch = input()

def prepareSoup(string0,i):
    if i == 0:
        url = 'https://dictionary.cambridge.org/dictionary/english/' + string0
    else:
        url = 'https://www.oxfordlearnersdictionaries.com/definition/english/' + string0
    html = get(url)
    return Soup(html)

soup = prepareSoup(wordToSearch,0)
sound = soup.find('source', {'type': 'audio/mpeg'}, partial=True)
soundStr = str(sound)
end1 = soundStr[32:].find('\"') + 32

urlEnd1 = 'https://dictionary.cambridge.org' + soundStr[32:end1]
print(urlEnd1) # The first given needed result!

soup2 = prepareSoup(wordToSearch,1)
transcription2 = str(soup2.find('span', {'class': 'phon'}, partial=True))
transcription21 = transcription2[transcription2.find('<span class=\"phon\">'):]
transcription22 = transcription21[19:]
transcription23 = transcription22[:transcription22.find('<')]
sounding3 = str(soup2.find('div', {'class': 'sound'}, partial=True))
sounding4 = sounding3[71:sounding3[71:].find('\"') + 71]

print(transcription23)
print(sounding4)

collocs1 = str(soup2.find('ul', {'class': 'collocs_list'}, partial=True))

print(collocs1)

dictionary = {
    'Cambridge_Pronunciation_URL': urlEnd1,
    'Oxford_Pronunciation_URL': sounding4,
    'Transcription': transcription23,
    'Oxford_Collocations_List_HTML': collocs1
}

json_object = json.dumps(dictionary, indent = 4)  
print(json_object) # The final result!

#########################################################3
# The Reverso API translator. Is adapted from the https://github.com/demian-wolf/ReversoAPI/blob/master/examples/Context/mini_reverso_context.py

api = ReversoContextAPI(wordToSearch,'en','ru')

print()
print("Translations:")
for source_word, translation, frequency, part_of_speech, inflected_forms in api.get_translations():
    print(source_word, "(English) ==", translation, "(Russian)")
    print("Frequency (how many word usage examples contain this word):", frequency)
    print("Part of speech:", part_of_speech if part_of_speech else "unknown")
    if inflected_forms:
        print("Inflected forms:", ", ".join(map(lambda iform: str(iform.translation), inflected_forms)))
    print()
    
