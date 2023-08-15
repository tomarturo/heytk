from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain

#get openai api key
# import os
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def initialize_qa():
    #get documents
    from langchain.document_loaders import TextLoader
    loader = TextLoader("./static/reference/about1.txt")
    documents = loader.load()

    # split text 
    text_splitter = CharacterTextSplitter(chunk_size=400, chunk_overlap=100)
    documents = text_splitter.split_documents(documents)

    #create embeddings and vectordb
    embeddings = OpenAIEmbeddings(openai_api_key="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")
    vectorstore = Chroma.from_documents(documents, embeddings)

    # create a memory object, which is neccessary to track the inputs/outputs and hold a conversation
    from langchain.memory import ConversationBufferMemory
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    # initialize the ConversationalRetrievalChain
    qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0, openai_api_key="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"), vectorstore.as_retriever(), memory=memory)

    return qa