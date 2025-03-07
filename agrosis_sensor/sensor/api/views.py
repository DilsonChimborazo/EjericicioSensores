from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import SensorSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@api_view(['POST'])
def recibir_dato(request):
    serializer = SensorSerializer(data=request.data)
    if serializer.is_valid():
        sensor = serializer.save()

        # Enviar notificación a WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensores",
            {
                "type": "enviar_dato",
                "message": {
                    "valor_sensor": sensor.valor_sensor,  
                    "fecha": str(sensor.fecha_registro)  
                }
            }
        )

        return Response(
            {"message": "Dato guardado correctamente", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
