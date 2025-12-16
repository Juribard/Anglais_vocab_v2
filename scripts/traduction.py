import json
#python traduction.py -> dans le cas ou le scripts est dissident
def conversion(txt_path, json_path):
    dictionnaire = []
    with open(txt_path, 'r', encoding='utf-8') as f:
        for ligne in f:
            parts = ligne.strip().split(';')
            if len(parts) == 3:
                # Plusieurs équivalents français
                if '/' in parts[1]:
                    m_fr = [x.strip() for x in parts[1].split('/')]
                else:
                    m_fr = parts[1].strip()
                # Plusieurs équivalents anglais
                if '/' in parts[2]:
                    m_en = [x.strip() for x in parts[2].split('/')]
                else:
                    m_en = parts[2].strip()
                dico = {
                    "type": parts[0],
                    "m_fr": m_fr,
                    "m_en": m_en
                }
                dictionnaire.append(dico)
    # Écriture dans le format JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(dictionnaire, f, ensure_ascii=False, indent=4)


# Appel de la fonction pour convertir voc_R311.txt en voc.js
conversion('voc_R309G.txt', 'voc.json')

def json_to_js(json_path, js_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write('const dictionnaire = ')
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.write(';')

# Utilisation :
json_to_js('voc.json', 'voc.js')

#traductions[X].afficher()
class Traduction:
    def __init__(self, dico):
        self.type = dico['type']
        self.m_fr = dico['m_fr']
        self.m_en = dico['m_en']

    def afficher(self):
        print(f"Type: {self.type}, French: {self.m_fr}, English: {self.m_en}")

# Lecture du fichier JSON
with open('voc.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

traductions = []
for item in data:
    t = Traduction(item)
    traductions.append(t)

for t in traductions:
    t.afficher()