{"version":3,"file":"lib/flake.min.js","sources":["lib/flake.js"],"names":["first_names","last_names","domain_extensions","lorem","nouns","adjectives","puncuation","ip_blocks","String","prototype","capitalize","this","charAt","toUpperCase","slice","flake","integer","min","max","Math","floor","random","first_name","last_name","full_name","noun","adjective","domain_extension","ip_address","domain_name","email_address","lorem_word","lorem_words","count","words","push","lorem_sentence","splice","join","lorem_sentences","sentences","paragraph","paragraphs","html_paragraph","plaintext_paragraph","html_body","map","plaintext_body","body","plaintext","html","module","exports"],"mappings":"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"}