var first_names = ["Victoria","Natalie","Grace","Jackson","Eli","Daniel","Carter","Hannah","Sebastian","Isaac","Emily","Layla","Gavin","Aiden","Ethan","Kaylee","Luke","Lily","Isabella","Zoey","Elizabeth","Alexander","Hailey","Camila","Henry","Julian","Brayden","Anthony","Will","Sofia","Noah","Matthew","Anna","Allison","Jaxon","Alexis","Samantha","Joseph","Olivia","Arianna","Ryan","Benjamin","Zoe","Audrey","Dylan","Lillian","Claire","Landon","Charlotte","Ella","James","Elijah","Liam","Harper","Gabriel","Mason","Mia","Samuel","Owen","Aaliyah","Nevaeh","Jack","Aubrey","Andrew","Savannah","Logan","Wyatt","Madison","Emma","Evelyn","Scarlett","Avery","Chloe","Jayden","Leah","Isaiah","Gabriella","Sophia","Abigail","Hunter","Addison","Sadie","Jacob","Joshua","Christopher","Brooklyn","Aria","Amelia","William","Riley","Michael","John","Levi","Christian","David","Nathan","Lucas","Jonathan","Sarah","Caleb"]
var last_names = ["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes"]
var domain_extensions = ["com","net","org","edu","io","co","de","co.uk","tk","info","cn","nl","ru","eu","br","it","in","ws","xyz","ninja"]
var lorem = ["ad","adipisicing","aliqua","aliquip","amet","anim","aute","cillum","commodo","consectetur","consequat","culpa","cupidatat","deserunt","do","dolor","dolore","duis","ea","eiusmod","elit","enim","esse","est","et","eu","ex","excepteur","exercitation","fugiat","id","in","incididunt","ipsum","irure","labore","laboris","laborum","lorem","magna","minim","mollit","nisi","non","nostrud","nulla","occaecat","officia","pariatur","proident"]
var nouns = ["time","year","people","way","day","man","thing","woman","life","child","world","school","state","family","student","group","country","problem","hand","part","place","case","week","company","system","program","question","work","government","number","night","point","home","water","room","mother","area","money","story","fact","month","lot","right","study","book","eye","job","word","business","issue","side","kind","head","house","service","friend","father","power","hour","game","line","end","member","law","car","city","community","name","president","team","minute","idea","kid","body","information","back","parent","face","others","level","office","door","health","person","art","war","history","party","result","change","morning","reason","research","girl","guy","moment","air","teacher","force","education"]
var adjectives = ["other","new","good","high","old","great","big","American","small","large","national","young","different","black","long","little","important","political","bad","white","real","best","right","social","only","public","sure","low","early","able","human","local","late","hard","major","better","economic","strong","possible","whole","free","military","true","federal","international","full","special","easy","clear","recent","certain","personal","open","red","difficult","available","likely","short","single","medical","current","wrong","private","past","foreign","fine","common","poor","natural","significant","similar","hot","dead","central","happy","serious","ready","simple","left","physical","general","environmental","financial","blue","democratic","dark","various","entire","close","legal","religious","cold","final","main","green","nice","huge","popular","traditional","cultural"]
var puncuation = ['.', '!', '?']
var ip_blocks = ['192.0.2', '198.51.100', '203.0.113']

// Array lengths (dynamically computing is unnecessary)
// first_names_length = 100
// last_names_length = 100
// domain_extensions_length = 20
// lorem_length = 50
// nouns_length = 100
// adjectives_length = 100
// puncuation_length = 3
// ip_blocks = 3

// http://stackoverflow.com/a/3291856
String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1) }

var flake = {}

flake.integer = function(min, max){
	if(!max){ max = min; min = 0 }
	return Math.floor(Math.random() * (max - min + 1)) + min
}

flake.first_name = function(){
	return first_names[this.integer(99)]
}

flake.last_name = function(){
	return last_names[this.integer(99)]
}

flake.full_name = function(){
	return this.first_name() + ' ' + this.last_name()
}

flake.noun = function(){
	return nouns[this.integer(99)]
}

flake.adjective = function(){
	return adjectives[this.integer(99)]
}

flake.puncuation = function(){
	return puncuation[this.integer(2)]
}

flake.domain_extension = function(){
	return domain_extensions[this.integer(19)]
}

flake.ip_address = function(){
	return ip_blocks[this.integer(2)] + '.' + this.integer(0, 255)
}

flake.domain_name = function(){
	return this.adjective().capitalize() + this.noun().capitalize() + '.' + this.domain_extension()
}

flake.email_address = function(){
	return this.first_name() + '@' + this.domain_name()
}

flake.lorem_word = function(){
	return lorem[this.integer(49)]
}

flake.lorem_words = function(count){
	var words = []
	while(count--){ words.push(this.lorem_word()) }
	return words
}

flake.lorem_sentence = function(){
	var words = this.lorem_words(this.integer(5, 15))
	return words[0].capitalize() + ' ' + words.splice(1).join(' ') + this.puncuation()
}

flake.lorem_sentences = function(count){
	var sentences = []
	while(count--){ sentences.push(this.lorem_sentence()) }
	return sentences
}

flake.paragraph = function(){
	return this.lorem_sentences(this.integer(5, 10)).join(' ')
}

flake.paragraphs = function(count){
	var paragraphs = []
	while(count--){ paragraphs.push(this.paragraph()) }
	return paragraphs
}

flake.html_paragraph = function(paragraph){
	return '<p>' + (paragraph || this.paragraph()) + '</p>'
}

flake.plaintext_paragraph = function(){
	return this.paragraph() + '\n'
}

flake.html_body = function(paragraphs){
	return (paragraphs || this.paragraphs(this.integer(1, 5))).map(function(paragraph){ return flake.html_paragraph(paragraph) }).join('')
}

flake.plaintext_body = function(paragraphs){
	return (paragraphs || this.paragraphs(this.integer(1, 5))).map(function(paragraph){ return flake.plaintext_paragraph(paragraph) }).join('')
}

flake.body = function(){
	var paragraphs = this.paragraphs(this.integer(1, 7))
	return {'plaintext': this.plaintext_body(paragraphs), 'html': this.html_body(paragraphs)}
}

module.exports = flake