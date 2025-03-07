import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SensorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("sensores", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("sensores", self.channel_name)

    async def receive(self, text_data): 
        data = json.loads(text_data)
        print("Dato recibido:", data)

    async def enviar_dato(self, event):
        await self.send(text_data=json.dumps(event["message"]))
