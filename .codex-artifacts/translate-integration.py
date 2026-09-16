from pathlib import Path
p=Path('src/components/NexaviaIntegrationEn.astro')
s=p.read_text(encoding='utf-8')
d={
'Naprave':'Devices','Vreme in javni podatki':'Weather and public data','Pregled stanja':'Status overview','Opozorila':'Alerts','Poročila':'Reports','KAI analiza':'KAI analysis',
'POVEZLJIVA Z VAŠIM OKOLJEM':'CONNECTED TO YOUR ENVIRONMENT','Vaši sistemi ostanejo. Podatki se povežejo v Nexavii.':'Your systems remain. Data connects in Nexavia.',
'Naprave, poslovni sistemi in zunanji viri se prek standardnih vmesnikov\n      združijo v enoten operativni pogled.':'Devices, business systems and external sources connect through standard interfaces in one operational view.',
'Brez nepotrebne zamenjave obstoječih sistemov':'No unnecessary replacement of existing systems','Postopna uvedba glede na vaše potrebe':'Phased implementation tailored to your needs','Kako poteka integracija':'How integration works',
'OD VIROV DO UPORABNE INFORMACIJE':'FROM SOURCES TO USEFUL INFORMATION','VIRI':'SOURCES','PLATFORMA':'PLATFORM','Povezovanje · obdelava · pravila':'Connectivity · processing · rules','UPORABA':'USE',
'Vloge in dostopi':'Roles and access','Nadzorovan dostop do podatkov in funkcionalnosti.':'Controlled access to data and functionality.','Sledljivost sprememb':'Change traceability','Evidenca aktivnosti in sprememb.':'Record of activity and changes.','Prilagodljiva uvedba':'Adaptable implementation'
}
for a,b in d.items(): s=s.replace(a,b)
s=s.replace('href="/resitve/integracije"','href="/en/solutions/integrations"')
p.write_text(s,encoding='utf-8')
