import logging
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionGenerateResponseWithGPT2(Action):
    def name(self) -> str:
        return "action_generate_response_with_gpt2"

    def __init__(self):
        super().__init__()
        self.model_name = "gpt2"
        self.model = GPT2LMHeadModel.from_pretrained(self.model_name)
        self.tokenizer = GPT2Tokenizer.from_pretrained(self.model_name)

    def generate_response(self, prompt, max_length=100):
        inputs = self.tokenizer.encode(prompt, return_tensors="pt")
        outputs = self.model.generate(inputs, max_length=max_length, do_sample=True, top_p=0.95, top_k=60)
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        query = tracker.latest_message.get('text')
        response = self.generate_response(query)
        dispatcher.utter_message(text=response)
        return []
