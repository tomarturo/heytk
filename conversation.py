from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain

#get openai api key
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

#get documents
from langchain.document_loaders import TextLoader
loader = TextLoader("reference/about1.txt")
documents = loader.load()

# split text 
text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=100)
documents = text_splitter.split_documents(documents)

#create embeddings and vectordb
embeddings = OpenAIEmbeddings(openai_api_key="OPENAI_API_KEY")
vectorstore = Chroma.from_documents(documents, embeddings)

# create a memory object, which is neccessary to track the inputs/outputs and hold a conversation
from langchain.memory import ConversationBufferMemory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# initialize the ConversationalRetrievalChain
qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0, openai_api_key="OPENAI_API_KEY"), vectorstore.as_retriever(), memory=memory)