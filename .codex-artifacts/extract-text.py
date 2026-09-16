import re,sys
s=open(sys.argv[1],encoding='utf-8').read()
for i,line in enumerate(s.splitlines(),1):
    clean=re.sub(r'<[^>]+>',' ',line)
    clean=re.sub(r'\{[^{}]*\}',' ',clean)
    clean=' '.join(clean.split())
    quoted=re.findall(r'(?<![\w-])["\']([^"\']*[A-Za-zČŠŽčšž][^"\']*)["\']',line)
    vals=[]
    if clean and re.search(r'[A-Za-zČŠŽčšž]{2}',clean): vals.append(clean)
    vals += [q for q in quoted if not any(x in q for x in ['/','.', '#','--','data-','aria-','class','width','height'])]
    if vals: print(f'{i}: '+' | '.join(dict.fromkeys(vals)))
