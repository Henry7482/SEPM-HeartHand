from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer

def summarize(content):
    # Instantiate the summarizer with LexRank
    summarizer = LexRankSummarizer()

    # Parse the newspaper content
    parser = PlaintextParser.from_string(content, Tokenizer("english"))

    # Summarize the content into short sentences
    summary = summarizer(parser.document, 2)

    output = ""
    # Combine the sentences into a single string
    for sentence in summary:
        output += str(sentence) + " "

    return output
