import sys
import spacy

# Load spaCy's English model
nlp = spacy.load('en_core_web_sm')

# Get the text input from Node.js
text = sys.argv[1]
doc = nlp(text)

# Extract product names (medicine names)
medicines = [ent.text for ent in doc.ents if ent.label_ == 'PRODUCT']

# Print the results so that Node.js can capture it
print(','.join(medicines))